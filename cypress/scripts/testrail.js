const Testrail = require('testrail-api');
const _ = require('lodash');
const fs = require('fs')
const path = require('path')
require('dotenv').config()

module.exports.hasConfig = (env = process.env) => {
    return (
      'TESTRAIL_HOST' in env ||
      'TESTRAIL_USERNAME' in env ||
      'TESTRAIL_PASSWORD' in env ||
      'TESTRAIL_PROJECTID' in env
    )
}

const env = process.env
if (!env.TESTRAIL_HOST) {
    throw new Error('TESTRAIL_HOST is required')
}
if (!env.TESTRAIL_USERNAME) {
    throw new Error('TESTRAIL_USERNAME is required')
}
if (!env.TESTRAIL_PASSWORD) {
    throw new Error('TESTRAIL_PASSWORD is required. Could be an API key.')
}
if (!env.TESTRAIL_PROJECTNAME) {
    throw new Error('TESTRAIL_PROJECTNAME is required.')
}
if (!env.TESTRAIL_MILESTONENAME) {
    throw new Error('TESTRAIL_MILESTONENAME is required.')
}
const dateTime = new Date().getTime()
const host = process.env.TESTRAIL_HOST
const user = process.env.TESTRAIL_USERNAME
const password = process.env.TESTRAIL_PASSWORD
const projectId = process.env.TESTRAIL_PROJECTID  // (async() => await this.getProject(process.env.TESTRAIL_PROJECTNAME)[0].id)
const suiteId = process.env.TESTRAIL_SUITEID
const milestoneId = (async() => await this.getMilestone(process.env.TESTRAIL_MILESTONENAME)[0].id)
process.env.TESTRAIL_TESTRUNNAME = `TESTRUN_${dateTime}`
process.env.TESTRAIL_TESTRUNDESC =`Description for TESTRUN_${dateTime}` 
const testrunName = process.env.TESTRAIL_TESTRUNNAME
const testrunDesc = process.env.TESTRAIL_TESTRUNDESC
let priority = process.env.TESTRAIL_PRIORITY
const statuses = {
    passed: 1,
    blocked: 2,
    untested: 3,
    retest: 4,
    failed: 5
}
const priorities = {
    low: 1,
    medium: 2,
    high: 3,
    critical: 4
}
let filter = { 
    // suite_id: suiteId,
    type_id: 7, // Automated id
    "custom_tc_auto_status":"2"
   
}
let testRunContent = {
    suite_id: suiteId,
    name: testrunName,
    description: testrunDesc,
    milestone_id: milestoneId,
    assignedto_id: 1,
    include_all: 0,
    case_ids: []
}
if (priority !== "") {
    if (isNaN(priority)) {
        priority = priorities[priority.trim().toLowerCase()]
    }
    filter.priority_id = priority
}
const testrail = new Testrail({
    host,
    user,
    password
});

module.exports.getPriority = (str) => {
    return priorities[str.trim().toLowerCase()]
}
module.exports.getTestCaseIDs = async() => {
    return _.map(await this.getTestCases(), 'id')
}
module.exports.getColumnDelimitedIDs = async() => {
    const testcasesIDs = await this.getTestCaseIDs()
    return testcasesIDs.map(i => `C${i}`).toString().split(',').join(';')
}
module.exports.init = async(projID) => {
    projID = projID || projectId || process.env.TESTRAIL_PROJECTID
    console.log('ProjectID:::: ',  projID)
    if (!process.env.TESTRAIL_ENABLED){ return console.log('TESTRAIL_ENABLED not set')}
    const testcases = await this.getTestCases(projID)
    const ids = _.map(testcases, 'id')
    const columnDelimitedIDs =  ids.map(i => `@C${i}`).toString().split(',').join(';')
    testRunContent.case_ids = ids
    const testRun = await this.addTestRun(projID, testRunContent)
    return {
        testcaseIDs: ids,
        columnDelimitedIDs,
        testRun 
    }
}
module.exports.getMilestone = async(name) => {
    name = name || process.env.TESTRAIL_MILESTONENAME
    const milestones = await this.getMilestones()
    const milestone = _.filter(milestones, function(o) { return o.name === name})
    console.log('MIleStone: ', milestone)
    return milestone
}
module.exports.getProjects = async() => {
    const resp = await testrail.getProjects(/*FILTERS=*/{ })
    return resp.body.projects
}
module.exports.getProject = async(name) => {
    name = name || process.env.TESTRAIL_PROJECTNAME
    const projects = await this.getProjects()
    const projectNames = _.map(projects, 'name')
    const projectName = projectNames.find(ele => {
        return ele.toLowerCase() === name.toLowerCase()
    })
    const project = _.filter(projects, function(o) { return o.name === projectName})
    console.log('Project: ', project)
    return project
}
module.exports.getMilestones = async() => {
    const resp = await testrail.getMilestones(projectId, /*FILTERS=*/{ })
    return resp.body.milestones
}
module.exports.getTestCases = async(projID) => {
    projID = projID || projectId || process.env.TESTRAIL_PROJECTID
    const results = await testrail.getCases(projID, filter)
    console.log('CASES: ', results.body.cases)
    return results.body.cases
}

module.exports.addTestRun = async(projID) => { 
    projID = projID || projectId || process.env.TESTRAIL_PROJECTID
    const testRun = await testrail.addRun(projID, testRunContent)
    const body = testRun.body
    process.env.TESTRAIL_TESTRUNID = body.id
    return body
}
module.exports.addResults = (payload) => {
    const runID = process.env.TESTRAIL_TESTRUNID
    console.log('RUNID: ', runID) 
    testrail.addResultForCase(
        /*RUN_ID=*/runID,
        /*CASE_ID=*/payload.caseID,
        /*CONTENT=*/{test_id: payload.testID, status_id: payload.status},
        function (err, response, result) {
        console.log("lslksklklsdksd: ", result);
    }) 
}

module.exports.getTestRunID = (env = process.env) => {   
    // try to read the test run id from the environment
    if ('TESTRAIL_TESTRUNID' in env) {
        return parseInt(env.TESTRAIL_TESTRUNID)
    }
    
    // try the "runId.txt" text file
    const filename = path.join(process.cwd(), 'runId.txt')
    console.log('checking file %s', filename)
    
    if (fs.existsSync(filename)) {
        const s = fs.readFileSync(filename, 'utf8').trim()
        console.log('read "%s"', s)
        return parseInt(s)
    }
    console.log('could not find runId.txt in folder %s', process.cwd())
      
}
// module.exports.getStatuses = async() => {
//     const response = await testrail.getStatuses()
//     return response.body
// }
module.exports.getStatuses = () => {
    return statuses
}

