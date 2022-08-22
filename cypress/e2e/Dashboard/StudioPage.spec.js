import { 
  failingPipeline,
  longRunningPipeline,
  simplePipeline,
  runPipelineData
} from '../../fixtures/setupdata'

import StudioPage  from '../../pageobjects/StudioPage'
describe('Pipelines', function () {
  afterEach(() => {
  })
  context('Scenario 2: Execute a long running Pipeline', function () {
    let pipelineName
    before(function () {
      pipelineName = `NewPipeline${new Date().getTime()}`
      cy.login()
      cy.visit('/')
      cy.CreateProjectSpace()
      cy.get('@CreatedProjectSpace').then((res) => {
        const projectPayload = {
          orgname: res.path.split('/')[1],
          projectspace: res.name,
          body: {asset_type: "Dir", name: `NewProject${new Date().getTime()}`, metadata: {pattern: false}}
        }
        cy.CreateProject(projectPayload)
        cy.get('@CreatedProject').then((res1) => {
          const importPipelinePayload = {
            name: pipelineName, 
            orgname: projectPayload.orgname,
            projectspace: projectPayload.projectspace,
            orgsnodeid: res.parent_snode_id,
            folder: res1.name,
            body: longRunningPipeline({
              name: pipelineName,
              email: res1.owner,
              path: `/${projectPayload.orgname}/${projectPayload.projectspace}/${res1.name}`
            })
          }
          cy.ImportPipeline(importPipelinePayload)
          cy.get('@ImportedPipeline').then((res2) => {
            const runPipelinePayload = {
              name: pipelineName,
              snodeid: res2,
              body: runPipelineData({ orgname: projectPayload.orgname })
            }
            cy.RunPipeline(runPipelinePayload)
          })
          
        })
      })
      StudioPage.visit()
      StudioPage.goToExecutionOverview()
    })
    it('pipeline should be present', function () {
      StudioPage.clickExecutingPipeline(pipelineName)
      let payload = {
        'Completed at': '-',
        'Username': 'dannankra',
      }
      StudioPage.verifyRunInfoSatistics(payload)
      StudioPage.runInfoStatsHeader.should('have.text', pipelineName)
    })
  })
})

describe('Pipelines', function () {
  afterEach(() => {
  })
  context('Scenario 4: Execute a failing Pipeline', function () {
    let pipelineName
    before(function () {
      pipelineName = `NewPipeline${new Date().getTime()}`
      cy.login()
      cy.visit('/')
      cy.CreateProjectSpace()
      cy.get('@CreatedProjectSpace').then((res) => {
        const projectPayload = {
          orgname: res.path.split('/')[1],
          projectspace: res.name,
          body: {asset_type: "Dir", name: `NewProject${new Date().getTime()}`, metadata: {pattern: false}}
        }
        cy.CreateProject(projectPayload)
        cy.get('@CreatedProject').then((res1) => {
          const importPipelinePayload = {
            name: pipelineName, 
            orgname: projectPayload.orgname,
            projectspace: projectPayload.projectspace,
            orgsnodeid: res.parent_snode_id,
            folder: res1.name,
            body: failingPipeline({
              name: pipelineName,
              email: res1.owner,
              path: `/${projectPayload.orgname}/${projectPayload.projectspace}/${res1.name}`
            })
          }
          cy.ImportPipeline(importPipelinePayload)
          cy.get('@ImportedPipeline').then((res2) => {
            const runPipelinePayload = {
              name: pipelineName,
              snodeid: res2,
              body: runPipelineData({ orgname: projectPayload.orgname })
            }
            cy.RunPipeline(runPipelinePayload)
          })
          
        })
      })
      StudioPage.visit()
      StudioPage.goToExecutionOverview()
    })
    it('pipeline should be present', function () {
      StudioPage.clickFailedPipeline(pipelineName)
      let payload = {
        'Snaplex/Node Name': 'Cloud',
        'Username': 'dannankra',
      }
      StudioPage.verifyRunInfoSatistics(payload)
      StudioPage.runInfoStatsHeader.should('have.text', pipelineName)
      StudioPage.errorDetailsTitle.should('have.text', 'Failed to validate the output')
    })
  })
})
describe('Pipelines', function () {
  afterEach(() => {
  })
  context('Scenario 3: Create and execute a smiple Pipeline',  () => {
    let pipelineName
    before( () => {
      pipelineName = `NewPipeline${new Date().getTime()}`
      cy.login()
      cy.visit('/')
      cy.CreateProjectSpace()
      cy.get('@CreatedProjectSpace').then((res) => {
        const projectPayload = {
          orgname: res.path.split('/')[1],
          projectspace: res.name,
          body: {asset_type: "Dir", name: `NewProject${new Date().getTime()}`, metadata: {pattern: false}}
        }
        cy.CreateProject(projectPayload)
        cy.get('@CreatedProject').then((res1) => {
          const importPayload = {
            name: pipelineName, 
            orgname: projectPayload.orgname,
            projectspace: projectPayload.projectspace,
            orgsnodeid: res.parent_snode_id,
            folder: res1.name,
            body: simplePipeline({
              name: pipelineName,
              email: res1.owner,
              path: `/${projectPayload.orgname}/${projectPayload.projectspace}/${res1.name}`
            })
          }
          cy.ImportPipeline(importPayload)
          cy.get('@ImportedPipeline').then((res2) => {
            const runPipelinePayload = {
              name: pipelineName,
              snodeid: res2,
              body: runPipelineData({ orgname: projectPayload.orgname })
            }
            cy.RunPipeline(runPipelinePayload)
          })
        })
      })
      StudioPage.visit()
      StudioPage.goToExecutionOverview()
    })
    it('pipeline should be present', () => {
      StudioPage.clickCompletedPipeline(pipelineName)
      let payload = {
        'Snaplex/Node Name': 'Cloud',
        'Username': 'dannankra',
      }
      StudioPage.verifyRunInfoSatistics(payload)
      StudioPage.runInfoStatsHeader.should('have.text', pipelineName)
    })
  })
})
