
const {_} = Cypress
import { 
  setProjectPermissions,
} from '../fixtures/setupdata'

Cypress.Commands.add('loginWithUI', (credentials) => {
  if(!credentials) {
    credentials = defaultCredentials
  }
  const emailFieldCss = 'input[type="email"]'
  cy.visit('/')
  cy.get(emailFieldCss).should('be.visible')
  cy.get(emailFieldCss).type(credentials.username)
  cy.get('input[type="password"]').type(credentials.password)
  cy.contains(('[qaid="loginButton"]'), 'Log In').click()
  cy.url().should('include', '/designer.html');
  cy.get('title').should('contain', 'SnapLogic Designer');
});

Cypress.Commands.add('login', (credentials) => {
  if(!credentials) {
    credentials = defaultCredentials
  }
  const encodedStr = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64') 
  try {
    cy.request({
      method: 'GET',
      url: `${cy.config('apiBaseUrl')}/1/rest/asset/session?caller=${credentials.username}`,
      headers: {
        Authorization: `Basic ${encodedStr}`
      },
    }).then((resp) => {
      const responseMap = resp.body.response_map
      if(resp.status === 200) { 
        cy.log('Response: ', JSON.stringify(resp.body))
        localStorage.setItem('SLToken', responseMap.token);
        localStorage.setItem('SL_LOGGING_TOKEN', responseMap.logging_token);
        localStorage.setItem('SLDBUsername',responseMap.username);
      } else {
        console.log(`Unable to login with the credentials provided: ${credentials.username} : ${credentials.password} - Error: ${responseMap.error_list}`)
      }
    })
    cy.visit('/');
  } catch (error) {
    console.log('ERRRRRR>...: ', error)
  }
});
Cypress.Commands.add('setupTest', (payload) => {
  cy.ImportProject(payload)
  cy.UpdatePermissions(payload)
});
Cypress.Commands.add('teardownTest', (payload) => {
  cy.DeleteProject(payload, payload.project) 
});

Cypress.Commands.add('logout', () => {
  cy.request({
    method: 'DELETE',
    url: `${cy.config('apiBaseUrl')}/1/rest/asset/session`,
    headers: {
      Authorization: `SLToken ${localStorage.getItem('SLToken')}`
    },
  }).then((resp) => {
    if(resp.status === 200) { 
      cy.log('Logout__Response: ', JSON.stringify(resp.body))
    } else {
      console.log('Unable to logout')
    }
  });
});

Cypress.Commands.add('CreateProjectSpace', (payload) => {
  payload = payload || {
    orgname: 'cytestorg',
    body: {asset_type: 'Dir', name: `RandomProjectSpace${new Date().getTime()}` }
  }
  cy.request({
    method: 'POST',
    url: `${cy.config('apiBaseUrl')}/1/rest/asset/${payload.orgname}/${payload.body.name}?path=%2F${payload.orgname}%2F${payload.body.name}`,
    body: payload.body,
    headers: {
      Authorization: `SLToken ${localStorage.getItem('SLToken')}`
    },
  }).then((resp) => {
    const responseMap = resp.body.response_map
    if(resp.status === 200) { 
      cy.wrap(resp.body.response_map).as('CreatedProjectSpace')
      cy.log('Response: ', JSON.stringify(resp.body))
    } else {
      console.log(`Unable to Create Project Space: ${payload.body.name}: - Error: ${responseMap.error_list}`)
    }
  });
});
Cypress.Commands.add('DeletePipeline', (payload, snodeId) => {
  let nodeId = snodeId || payload.snodeId
  cy.request({
    method: 'POST',
    url: `${cy.config('apiBaseUrl')}/1/rest/pipeline/delete/${nodeId}`,
    headers: {
      Authorization: `SLToken ${localStorage.getItem('SLToken')}`
    },
  }).then((resp) => {
    const responseMap = resp.body.response_map
    if(resp.status === 200) { 
      cy.wrap(resp.body.response_map).as('DeletedPipeline')
      cy.log('Response: ', JSON.stringify(resp.body))
    } else {
      console.log(`Unable to Delete Pipeline: ${payload.projectspace}: - Error: ${responseMap.error_list}`)
    }
  });
});
Cypress.Commands.add('DeleteProject', (payload, project) => {
  cy.GetProjectDetails(payload, project)
  cy.get('@ProjectDetails').then(projectDetails => {
    const entries =_.filter(projectDetails.entries, function(o) {return (o.asset_type === 'Pipeline' && !o.path.includes('DashboardTests'))})
    const pipelineSnodeIds = _.map(entries, 'snode_id')
    cy.log('pipelineSnodeIds: ', JSON.stringify(pipelineSnodeIds))
    pipelineSnodeIds.forEach(snodeId => {
      // payload.snodeId = snodeId
      cy.DeletePipeline(payload, snodeId)
    })
  })
  cy.request({
    method: 'DELETE',
    url: `${cy.config('apiBaseUrl')}/1/rest/asset/${payload.orgname}/${payload.projectspace}/${project}?soft_delete=True`,
    headers: {
      Authorization: `SLToken ${localStorage.getItem('SLToken')}`
    },
  }).then((resp) => {
    const responseMap = resp.body.response_map
    if(resp.status === 200) {
      cy.wrap(resp.body.response_map).as('DeleteProject')
    } else {
      console.log(`Unable to Delete Project: ${payload.body.name}: - Error: ${responseMap.error_list}`)
    }
  });
});
Cypress.Commands.add('DeleteProjectSpace', (payload) => {
  cy.request({
    method: 'DELETE',
    url: `${cy.config('apiBaseUrl')}/1/rest/asset/${payload.orgname}/${payload.projectspace}/?force=true`,
    headers: {
      Authorization: `SLToken ${localStorage.getItem('SLToken')}`
    },
  }).then((resp) => {
    const responseMap = resp.body.response_map
    if(resp.status === 200) { 
      cy.wrap(resp.body.response_map).as('DeletedProjectSpace')
      cy.log('Response: ', JSON.stringify(resp.body))
    } else {
      console.log(`Unable to Delete Project Space: ${payload.projectspace}: - Error: ${responseMap.error_list}`)
    }
  });
});
Cypress.Commands.add('CreateProject', (payload) => {
  payload = payload || {
    orgname: 'Automation1',
    projectspace: 'DanielPS',
    body: {asset_type: "Dir", name: `NewProject${new Date().getTime()}`, metadata: {pattern: false}}
  }
  cy.request({
    method: 'POST',
    url: `${cy.config('apiBaseUrl')}/1/rest/asset/${payload.orgname}/${payload.projectspace}/${payload.body.name}?path=%2F${payload.orgname}%2F${payload.projectspace}%2F${payload.body.name}`,
    body: payload.body,
    headers: {
      Authorization: `SLToken ${localStorage.getItem('SLToken')}`
    },
  }).then((resp) => {
    const responseMap = resp.body.response_map
    if(resp.status === 200) {
      cy.wrap(resp.body.response_map).as('CreatedProject')
    } else {
      console.log(`Unable to Create Project: ${payload.body.name}: - Error: ${responseMap.error_list}`)
    }
  });
});
Cypress.Commands.add('GetProjectSpaceDetails', (payload) => {
  cy.request({
    method: 'GET',
    url: `${cy.config('apiBaseUrl')}/1/rest/asset/list/${payload.orgname}/${payload.projectspace}`,
    body: payload.body,
    headers: {
      Authorization: `SLToken ${localStorage.getItem('SLToken')}`
    },
  }).then((resp) => {
    if(resp.status === 200) {
      cy.wrap(resp.body.response_map).as('ProjectSpaceDetails')
    }
  });
});
Cypress.Commands.add('DeleteAllAssets', (payload) => {
  try {
    cy.GetProjectSpaceDetails(payload)
    cy.get('@ProjectSpaceDetails').then(details => {
      const projects = _.map(details.entries, 'name')
      _.each(projects, (project) => {
          payload.project = project
          cy.log('Payload: ', JSON.stringify(payload))
         
          cy.DeleteProject(payload, project)
         })
      // cy.DeleteProjectSpace(payload)
    })
  } catch (ex) {
    cy.log(ex)
  }
});

Cypress.Commands.add('GetProjectDetails', (payload, project) => {
  project = project || payload.project
  cy.request({
    method: 'GET',
    url: `${cy.config('apiBaseUrl')}/1/rest/asset/list/${payload.orgname}/${payload.projectspace}/${project}`,
    body: payload.body,
    headers: {
      Authorization: `SLToken ${localStorage.getItem('SLToken')}`
    },
  }).then((resp) => {
    if(resp.status === 200) {
      cy.wrap(resp.body.response_map).as('ProjectDetails') 
    }
  });
});
Cypress.Commands.add('ImportPipeline', (payload) => {
  cy.request({
    method: 'POST',
    url: `${cy.config('apiBaseUrl')}/2/${payload.orgsnodeid}/rest/project/import/pipe/slp/${payload.orgname}/${payload.projectspace}/${payload.folder}?duplicate_check=True`,
    body: payload.body,
    headers: {
      Authorization: `SLToken ${localStorage.getItem('SLToken')}`
    },
  }).then((resp) => {
    const responseMap = resp.body.response_map
    if(resp.status === 200) { 
      cy.wrap(resp.body.response_map).as('ImportedPipeline')
    } else {
      console.log(`Unable to Create Pipeline: ${payload.name}: - Error: ${responseMap.error_list}`)
    }
  });
});
Cypress.Commands.add('ImportProject', (payload) => {
  if (!payload.project) { payload.project = 'DashboardTests'} 
  let url = `${cy.config('apiBaseUrl')}/2/${payload.orgsnodeid}/rest/project/import/${payload.orgname}/${payload.projectspace}/${payload.project}?duplicate_check=False`
  const data = new FormData();
      cy.fixture('DashboardTests.zip', 'binary')
        .then((binary) => Cypress.Blob.binaryStringToBlob(binary))
        .then( blob  => {
          data.append('hasHeader', true)
          data.append('name', payload.project);
          data.append('file', blob, 'DashboardTests');
          data.append('filename', 'DashboardTests.zip');
          cy.request({
            method: 'POST',
            url,
            body: data,
            headers: {
              Authorization: `SLToken ${localStorage.getItem('SLToken')}`,
            },
          }).its('status').should('be.equal', 200)
    });
});
Cypress.Commands.add('GetPipelinesInfo', (payload) => {
  return cy.request({
    method: 'GET',
    url: `${cy.config('apiBaseUrl')}/1/rest/pipeline?path_id=${payload.orgname}/${payload.projectspace}/${payload.project}&field_list=property_map,update_time,update_user_id,path_id,snap_reduce`,
    headers: {
      Authorization: `SLToken ${localStorage.getItem('SLToken')}`
    },
    }).then((resp) => {
    const responseMap = resp.body.response_map
    cy.log('REsponse Map: ;; ', responseMap)
    if(resp.status === 200) { 
        // var jsonPath = require('jsonpath');
        // let items = jsonPath.query(responseMap, 'pipeline_map')
        let items = payload.data // Temporary workaround to get the dashbaord data
        let info = []
        items.forEach(item => {
          let name = item.property_map.info.label.value.split(' ').join('').toLowerCase()
          let obj = {
            name: item.property_map.info.label.value,
            author: item.property_map.info.author.value,
            snodeid: item.snode_id,
            uri: item.uri,
            instanceid: item.instance_id,
            pathid: item.path_id,
          }
          info.push(obj)
        })
        cy.wrap(info).as('GetPipelinesInfo')
    } else {
        console.log(`Unable to get Pipeline: ${payload.name}: - Error: ${responseMap.error_list}`)
    }
  });
});
Cypress.Commands.add('GetPipelineInfo', (payload) => {
  cy.GetPipelinesInfo(payload)
  cy.get('@GetPipelinesInfo').then(pipelineInfo => {
    const info =_.filter(pipelineInfo, function(o) {return (o.name === payload.name)})
    cy.wrap(info).as('GetPipelineInfo')
    cy.log('IFooks:::: ', JSON.stringify(info))
  })
});
Cypress.Commands.add('RunPipeline', (payload) => {
  cy.request({
    method: 'POST',
    url: `${cy.config('apiBaseUrl')}/1/rest/pipeline/prepare/${payload.snodeid}`,
    body: payload.body,
    headers: {
      Authorization: `SLToken ${localStorage.getItem('SLToken')}`
    },
    }).then((resp) => {
    const responseMap = resp.body.response_map
    if(resp.status === 200) { 
        cy.wrap(resp.body).as('RunPipeline')
    } else {
        console.log(`Unable to Create Pipeline: ${payload.name}: - Error: ${responseMap.error_list}`)
    }
  });
});

Cypress.Commands.add('UpdatePermissions', (payload) => {
  let path = `${payload.orgname}/${payload.projectspace}`

  if (payload.project) {
   path = `${path}/${payload.project}`
  }
  payload.path = path
  cy.request({
    method: 'POST',
    url: `${cy.config('apiBaseUrl')}/1/rest/asset/acl/${path}`,
    body: setProjectPermissions(payload),
    headers: {
      Authorization: `SLToken ${localStorage.getItem('SLToken')}`
    },
    }).then((resp) => {
      cy.wrap(resp.body.response_map).as('UpdatedPermissions')
  });
});

Cypress.Commands.add('expectPathname', (pathname) =>
  cy.location().should((location) => expect(location.pathname).to.eq(pathname))
);

Cypress.Commands.add('asAll', (obj) =>
  Object.keys(obj).forEach(function (key) {
    cy.get(`[name="${key}"]`).as(key);
  })
);
Cypress.Commands.add('clickLink', (label) => {
  cy.get('a').contains(label).click();
});

Cypress.Commands.add('logout1', () => {
  cy.window().its('localStorage').invoke('removeItem', 'session');
  cy.visit('/');
});

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorageCache", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorageCache", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add("clearLocalStorageCache", () => {
  localStorage.clear();
  LOCAL_STORAGE_MEMORY = {};
});

Cypress.Commands.add("text", {prevSubject: true }, (subject, text) => {
  subject.val(text)
  return cy.wrap(subject)
});