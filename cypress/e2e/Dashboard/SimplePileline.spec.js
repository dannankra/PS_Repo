import { 
  simplePipeline,
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
  context('Scenario 3: Create and execute a smiple Pipeline',  () => {
    
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
      cy.login(users.user1)
      cy.visit('/')
      cy.GetProjectSpaceDetails({ projectspace, orgname })
      cy.get('@ProjectSpaceDetails').then((res) => {
          projectPayload = {
          orgname,
          projectspace,
          body: {asset_type: "Dir", name: project, metadata: {pattern: false}}
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
            body: simplePipeline({
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
    it('pipeline should be present', () => {
      StudioPage.clickCompletedPipeline(pipeline)
      let expected = {
        'Snaplex/Node Name': 'Cloud',
        'Username': 'dannankra',
      }
      StudioPage.verifyRunInfoSatistics(expected)
      StudioPage.runInfoStatsHeader.should('have.text', pipeline)
    })
  })
})
