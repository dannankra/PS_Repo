const testrail = require('./cypress/scripts/testrail')
/* eslint-disable no-console */
const cypress = require('cypress')
// http://riaevangelist.github.io/node-ipc/
const ipc = require('node-ipc').default

  //   cypress.cli.parseRunArguments(process.argv.slice(2))
  // .then((runOptions) => {
  //   console.log('Parsed cypress run options:')
  //   console.log(runOptions)

  //   return runOptions
  // })
  // .then(cypress.run)
  let runOptions = {}
  if (process.env.TESTRAIL_ENABLED) {
    // This process runs first using "node ." command.
    // It creates an IPC server with ID "cypressListener"
    // and then starts Cypress tests using "cypress" NPM module API
    // (see https://on.cypress.io/module-api)
    ipc.config.id = 'cypressListener'
    ipc.serve(async() => {
      console.log('ipc.serve')
      testrail.getProject(process.env.TESTRAIL_PROJECTNAME).then(function(project) {
        const projectID = project[0].id
        process.env.TESTRAIL_PROJECTID = projectID 
        testrail.init(projectID).then(function(results) {
          process.env.TESTRAIL_TESTRUNID = results.testRun.id
          runOptions = { env : `grepTags=${results.columnDelimitedIDs }` }
          runTest(runOptions)

          // receive stream of events
          // we will get a message with each test's results
          // as soon as the test runs
          // (in reality, it will be send when the next test starts,
          // or for the last test when "after" hook starts)
          ipc.server.on('test:after:run', (data) => {
            console.log('test finsihed: "%s" %s %dms',
              data.title, data.state, data.duration)
              let testID = data.title.split(' ')[0].split('C')[1]
              if (testID) {
                testrail.addResults({ caseID: testID, testID, status: testrail.getStatuses()[data.state] })
              }  
          })
        })
      })
    })
    ipc.server.start()
  } else if (process.env.SPECFILES) {
    runOptions = { spec: process.env.SPECFILES }
    runTest(runOptions)
  } else if (process.env.TESTTAGS) {
    runOptions = { env : `grepTags=${process.env.TESTTAGS}` }
    runTest(runOptions)
  }
function runTest(options) {
  cypress.run(
    options
  ).then((results) => {
      console.log('all done ✔️')
      process.env.TESTRAIL_ENABLED && ipc.server.stop()
    if (results.failures) {
      // means really bad error, could not run tests
      console.error('Failed to run Cypress')
      console.error(results.message)
      process.exit(1)
    }

    console.log('Cypress run results: %d total tests, %d passed, %d failed',
      results.totalTests, results.totalPassed, results.totalFailed)

    process.exit(results.totalFailed)
  }).catch ((err) => {
    console.error(err)
  })
}