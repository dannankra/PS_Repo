import { 
  failingPipeline,
  longRunningPipeline,
  simplePipeline,
  runPipelineData,
  initialTestData
} from '../../fixtures/setupdata'

import StudioPage  from '../../pageobjects/StudioPage'
describe('Pipelines', function () {
  let { 
    orgname,
    orgsnodeid,
    projectspace,
    project,
    perm  
  } = initialTestData()
  before(() => {
    cy.clearLocalStorageCache();
    cy.login()
    cy.visit('/')
  })
  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });
  after(() => {
    cy.logout()
  })
  afterEach(() => {
    cy.DeleteProject({ projectspace, orgname }, project)
    cy.saveLocalStorageCache();
  });
  
  context('Scenario 2: Execute a long running Pipeline', function () {
    it('pipeline should be present', function () {
      let pipeline = `LongRunning_${new Date().getTime()}`
      cy.GetProjectSpaceDetails({ projectspace, orgname })
      cy.get('@ProjectSpaceDetails').then((res) => {
        const projectPayload = {
          orgname,
          projectspace,
          body: {asset_type: "Dir", name: project, metadata: {pattern: false}}
        }
        cy.CreateProject(projectPayload)
        cy.get('@CreatedProject').then((res1) => {
          const importPipelinePayload = {
            name: pipeline, 
            orgname,
            projectspace,
            orgsnodeid,
            folder: res1.name,
            body: longRunningPipeline({
              name: pipeline,
              email: res1.owner,
              path: `/${orgname}/${projectspace}/${res1.name}`
            })
          }
          cy.ImportPipeline(importPipelinePayload)
          cy.get('@ImportedPipeline').then((res2) => {
            const runPipelinePayload = {
              name: pipeline,
              snodeid: res2,
              body: runPipelineData({ orgname })
            }
            cy.RunPipeline(runPipelinePayload)
          })
          
        })
      })
      StudioPage.visit()
      StudioPage.goToExecutionOverview()
      StudioPage.clickExecutingPipeline(pipeline)
      let payload = {
        'Snaplex/Node Name': 'Cloud',
        'Completed at': '-',
        'Username': 'dannankra',
      }
      StudioPage.verifyRunInfoSatistics(payload)
      StudioPage.runInfoStatsHeader.should('have.text', pipeline)
      StudioPage.closeDetailsFlyout()
    })
  })
  context('Scenario 4: Execute a failing Pipeline', function () {
    it('pipeline should be present', function () {
      let pipeline = `Failing_${new Date().getTime()}`
      cy.GetProjectSpaceDetails({ projectspace, orgname })
      cy.get('@ProjectSpaceDetails').then((res) => {
        const projectPayload = {
          orgname,
          projectspace,
          body: {asset_type: "Dir", name: project, metadata: {pattern: false}}
        }
        cy.CreateProject(projectPayload)
        cy.get('@CreatedProject').then((res1) => {
          const importPipelinePayload = {
            name: pipeline, 
            orgname,
            projectspace,
            orgsnodeid,
            folder: res1.name,
            body: failingPipeline({
              name: pipeline,
              email: res1.owner,
              path: `/${ orgname }/${ projectspace }/${res1.name}`
            })
          }
          cy.ImportPipeline(importPipelinePayload)
          cy.get('@ImportedPipeline').then((res2) => {
            const runPipelinePayload = {
              name: pipeline,
              snodeid: res2,
              body: runPipelineData({ orgname: orgname })
            }
            cy.RunPipeline(runPipelinePayload)
          })
          
        })
      })
      StudioPage.visit()
      StudioPage.goToExecutionOverview()
      StudioPage.clickFailedPipeline(pipeline)
      let payload = {
        'Snaplex/Node Name': 'Cloud',
        'Username': 'dannankra',
      }
      StudioPage.verifyRunInfoSatistics(payload)
      StudioPage.runInfoStatsHeader.should('have.text', pipeline)
      StudioPage.errorDetailsTitle.should('have.text', 'Failed to validate the output')
      StudioPage.closeDetailsFlyout()
    })
  })
  context('Scenario 3: Create and execute a smiple Pipeline',  () => {
    it('pipeline should be present', () => {
      let pipeline = `Simple_${new Date().getTime()}`
      cy.GetProjectSpaceDetails({ projectspace, orgname })
      cy.get('@ProjectSpaceDetails').then((res) => {
        const projectPayload = {
          orgname,
          projectspace,
          body: {asset_type: "Dir", name: project, metadata: {pattern: false}}
        }
        cy.CreateProject(projectPayload)
        cy.get('@CreatedProject').then((res1) => {
          const importPayload = {
            name: pipeline, 
            orgname,
            projectspace,
            orgsnodeid,
            folder: res1.name,
            body: simplePipeline({
              name: pipeline,
              email: res1.owner,
              path: `/${orgname}/${projectspace}/${res1.name}`
            })
          }
          cy.ImportPipeline(importPayload)
          cy.get('@ImportedPipeline').then((res2) => {
            const runPipelinePayload = {
              name: pipeline,
              snodeid: res2,
              body: runPipelineData({ orgname })
            }
            cy.RunPipeline(runPipelinePayload)
          })
        })
      })
      StudioPage.visit()
      StudioPage.goToExecutionOverview()
      StudioPage.clickCompletedPipeline(pipeline)
      let payload = {
        'Snaplex/Node Name': 'Cloud',
        'Username': 'dannankra',
      }
      StudioPage.verifyRunInfoSatistics(payload)
      StudioPage.runInfoStatsHeader.should('have.text', pipeline)
    })
  })
})
