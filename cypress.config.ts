import { defineConfig } from 'cypress'
require('dotenv').config()
let ipc
// http://riaevangelist.github.io/node-ipc/
if (process.env.TESTRAIL_ENABLED) {
  ipc = require('node-ipc').default

  ipc.connectTo('cypressListener', () => {
    ipc.of.cypressListener.on('connect', () => {
      ipc.log('## connected to Cypress listener ##')
    })
  })
}

export default defineConfig({
  projectId: 'cogge3',
  apiBaseUrl: process.env.APIBASEURL,
  fixturesFolder: './cypress/fixtures',
  supportFolder: './cypress/support',
  defaultCommandTimeout: 30000,
 e2e: {
  baseUrl: process.env.BASEURL,
  specPattern: 'cypress/e2e/**/*.spec.js',
  supportFile: './cypress/support/e2e.js',
    env: {
      // apiBaseUrl: process.env.APIBASEURL,
      grepFilterSpecs: true,
      grepOmitFiltered:true
    },
    setupNodeEvents(on, config) {
      on('task', {
        testFinished (attributes) {
          if (process.env.TESTRAIL_ENABLED) {
            console.log('%s: "%s" %dms', attributes.state, attributes.title, attributes.duration)
            ipc.of.cypressListener.emit('test:after:run', {
              state: attributes.state,
              title: attributes.title,
              duration: attributes.duration,
            })
          }
          return null
        },
      })
      require('./cypress/plugins')(config)
      require('cypress-grep/src/plugin')(config)
      return config
    }
  }
})
