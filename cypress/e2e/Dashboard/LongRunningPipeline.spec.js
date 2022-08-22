import { 
  longRunningPipeline,
  runPipelineData,
  initialTestData
} from '../../fixtures/setupdata'
import { 
  users
} from '../../fixtures/users'


import StudioPage  from '../../pageobjects/StudioPage'
describe('Pipelines', function () {
  afterEach(() => {
  })
  context('Scenario 4: Execute a failing Pipeline',  () => {
    
    let projectPayload
    const { 
      orgname,
      orgsnodeid,
      projectspace,
      project,
      pipeline, 
      perm  
    } = initialTestData()
   
    before(() => {
      cy.login(users.user2)
      cy.visit('/')
      cy.GetProjectSpaceDetails({ projectspace, orgname })
      cy.get('@ProjectSpaceDetails').then((res) => {
          projectPayload = {
          orgname,
          projectspace,
          body: { asset_type: "Dir", name: project, metadata: { pattern: false } }
        }
        projectPayload.perm = perm
        cy.UpdatePermissions(projectPayload)
        cy.CreateProject(projectPayload)
        cy.get('@CreatedProject').then((res1) => {
          const importPayload = {
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
          projectPayload.project = importPayload.folder  
          cy.UpdatePermissions(projectPayload) 
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
    })
    after(function () {
      cy.DeleteProject({ projectspace, orgname }, project)
    })
    it('pipeline should be present', function () {
      StudioPage.clickExecutingPipeline(pipeline)
      let payload = {
        'Completed at': '-',
        'Username': 'dannankra',
      }
      StudioPage.verifyRunInfoSatistics(payload)
      StudioPage.runInfoStatsHeader.should('have.text', pipeline)
    })
  })
})
