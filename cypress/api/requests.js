import { 
    fakePipeline,
    longRunningPipeline,
    runPipelineData
 } from '../fixtures/setupdata'
const USER = localStorage.getItem('SLDBUsername');
const TOKEN = localStorage.getItem('SLToken');


export const createPipeline = async (payload) => {  
    if(!TOKEN) { return console.log('createPipeline requires login')}
    const pipelineName = `NewPipeline${new Date().getTime()}`
    payload = payload || {
        name: pipelineName, 
        orgname: 'Automation1',
        projectspace: 'DanielPS',
        folder: 'Others',
        body: fakePipeline({name: pipelineName, email: USER})
      }
      cy.request({
        method: 'POST',
        
        url: `${cy.config('apiBaseUrl')}/2/5be4a4cded5edc0017b9aa70/rest/pipeline/create?path_id=/${payload.orgname}/${payload.projectspace}/${payload.folder}&duplicate_check=True`,
        body: payload.body,
        headers: {
          Authorization: `SLToken ${TOKEN}`
        },
      }).then((resp) => {
        const responseMap = resp.body.response_map
        if(resp.status === 201) {
          cy.wrap(resp.body.response_map).as('CreatedPipeline')
          return resp.body
        } else {
          console.log(`Unable to Create Pipeline: ${payload.name}: - Error: ${responseMap.error_list}`)
        }
      });
}


export const importPipeline = (payload) => {  
    if(!TOKEN) { return console.log('Import pipeline requires login')}
    const pipelineName = `2minute_pipeline${new Date().getTime()}`
    const path = '/Automation1/DanielPS/shared'
    payload = payload || {
        name: pipelineName, 
        orgname: 'Automation1',
        projectspace: 'DanielPS',
        orgsnodeid: '5be4a4cded5edc0017b9aa70',
        folder: 'Others',
        body: longRunningPipeline({name: pipelineName, email: USER, path})
      }
      cy.request({
        method: 'POST',
        url: `${cy.config('apiBaseUrl')}/2/${payload.orgsnodeid}/rest/project/import/pipe/slp/${payload.orgname}/${payload.projectspace}/${payload.folder}?duplicate_check=True`,
        body: payload.body,
        headers: {
          Authorization: `SLToken ${TOKEN}`
        },
      }).then((resp) => {
        const responseMap = resp.body.response_map
        if(resp.status === 200) { 
          cy.log('Import Pipeline:::: ', JSON.stringify(resp.body.response_map))
          cy.wrap(resp.body.response_map).as('ImportedPipeline')
        } else {
          console.log(`Unable to Create Pipeline: ${payload.name}: - Error: ${responseMap.error_list}`)
        }
        
      });
    }

export const runPipeline = async (payload) => {  
    if(!TOKEN) { return console.log('Run pipeline requires login')}
    const orgName = 'Automation1' 
    payload = payload || {
        name: '2minute_pipeline',
        snodeid: '62547fe49d8c96391d8d8cab',
        body: runPipelineData({ orgname: orgName })
    }
   cy.request({
        method: 'POST',
        url: `${cy.config('apiBaseUrl')}/1/rest/pipeline/prepare/${payload.snodeid}`,
        body: payload.body,
        headers: {
            Authorization: `SLToken ${TOKEN}`
        },
        }).then((resp) => {
        const responseMap = resp.body.response_map
        if(resp.status === 200) { 
            cy.log('Response: ', JSON.stringify(resp.body))
            cy.wrap(resp.body).as('RunPipeline')
        } else {
            console.log(`Unable to Create Pipeline: ${payload.name}: - Error: ${responseMap.error_list}`)
        }
    });
}