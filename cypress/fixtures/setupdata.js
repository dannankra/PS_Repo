import { faker } from '@faker-js/faker';

const organizations = {
    dev: {
        name: 'cytestorg', 
        projectspace: 'cypresspoc',
        orgsnodeid: '6260703c512d891a338ff786'
    }
}

const runtime = {
    pathid: `${organizations.dev.name}/rt/cloud/dev`,
    label: 'Cloud' 
}
const getRuntime = (org) => {
    return {
        pathid: `${organizations.dev.name}/rt/cloud/dev`,
        label: 'Cloud' 
    }
}
export const permissions = {
    types: {
        fullaccess: ['R','X','W'],
        readonly: ['R'],
        readexecute: ['R','X'],
        readwrite: ['R', 'W']
    }
}
export const initialTestData = () => {
    return {
        orgname: organizations.dev.name,
        projectspace: organizations.dev.projectspace,
        data: dashboardProject(),
        orgsnodeid: organizations.dev.orgsnodeid,
        project: `${faker.random.alphaNumeric(5)}_Dashboard`,
        pipeline: `${faker.random.alphaNumeric(5)}_Pipeline`,
        perms: permissions.types.fullaccess
    }
}
export const runPipelineData = (payload) => {
    return {
        runtime_path_id: payload.runtimepathid || runtime.pathid,
        runtime_label: payload.runtimelabel || runtime.label,
        do_start: true,
        async: true,
        priority: 10
    }
}
export const fakePipeline = (payload) => {  
  return {
    class_fqid: 'com-snaplogic-pipeline_9',
    client_id: 'x4',
    property_map: {
        error: {
            error0: {
                view_type: {
                    value: 'document'
                },
                label: {
                    value: 'error0'
                }
            },
            error1: {
                view_type: {
                    value: 'binary'
                },
                label: {
                    value: 'error1'
                }
            },
            error_behavior: {
                value: 'none'
            }
        },
        info: {
            label: {
                value: payload.name
            },
            author: {
                value: payload.email
            },
            pipeline_doc_uri: {
                value: null
            },
            notes: {
                value: null
            },
            purpose: {
                value: null
            }
        },
        settings: {
            suspendable: {
                value: false
            },
            test_pipeline: {
                value: false
            },
            error_pipeline: {
                value: null,
                expression: false
            },
            error_param_table: {
                value: []
            },
            param_table: {
                value: []
            },
            imports: {
                value: []
            }
        },
        input: {},
        output: {}
    },
    snap_map: {},
    link_map: {},
    render_map: {
        scale_ratio: 1,
        pan_x_num: 0,
        pan_y_num: 0,
        default_snaplex: payload.snaplex || '5f46d227fc119b553d3a8102',
        detail_map: {}
    },
    link_serial: 100
  }
}
export const setProjectPermissions = (payload) => {
    return {
        perms: [
            'R',
            'X',
            'W'
        ],
        path: payload.path, // '/cytestorg/RandomProjectSpace1651065615783/shared',
        subject: 'admins',
        subject_type: 'GROUP',
        inherit: true
    }
}
export const longRunningPipeline = (payload) => {
    return {
        pipe: {
            class_fqid: 'com-snaplogic-pipeline_9',
            snode_id: '62547fe49d8c96391d8d8cab',
            instance_id: '885f4951-d37f-4a3a-a36b-ca477bdf1fa9',
            instance_version: 2,
            link_map: {
                link100: {
                    src_view_id: 'output0',
                    dst_view_id: 'input0',
                    src_id: 'cd1c5bfb-56d1-492d-8672-16904dd21c8b',
                    dst_id: 'faaee5df-f442-44c1-958a-7a9dbefce22c',
                    isGoto: false
                }
            },
            link_serial: 101,
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: payload.name
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: payload.email
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    },
                    suspendable: {
                        value: false
                    },
                    test_pipeline: {
                        value: false
                    },
                    imports: {
                        value: []
                    },
                    error_param_table: {
                        value: []
                    },
                    error_pipeline: {
                        expression: false,
                        value: null
                    }
                },
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                output: {
                    'faaee5df-f442-44c1-958a-7a9dbefce22c_output0': {
                        view_type: {
                            value: 'document'
                        },
                        label: {
                            value: 'Throttle Bot - output0'
                        }
                    }
                }
            },
            render_map: {
                pan_x_num: 0,
                default_snaplex: '616dfb13a7b54eb8763ebbdd',
                scale_ratio: 1,
                detail_map: {
                    'faaee5df-f442-44c1-958a-7a9dbefce22c': {
                        grid_x_int: 3,
                        index: null,
                        recommendation_id: null,
                        source: 'snap catagory',
                        grid_y_int: 1,
                        rot_tail_int: 0,
                        rot_int: 0
                    },
                    'cd1c5bfb-56d1-492d-8672-16904dd21c8b': {
                        grid_x_int: 2,
                        index: null,
                        recommendation_id: null,
                        source: 'snap catagory',
                        grid_y_int: 1,
                        rot_tail_int: 0,
                        output: {},
                        rot_int: 0
                    }
                },
                pan_y_num: 0
            },
            snap_map: {
                'faaee5df-f442-44c1-958a-7a9dbefce22c': {
                    class_fqid: 'com-snaplogic-snaps-test-throttlebot_1-develop14729',
                    class_id: 'com-snaplogic-snaps-test-throttlebot',
                    class_version: 1,
                    instance_fqid: 'faaee5df-f442-44c1-958a-7a9dbefce22c_1',
                    instance_id: 'faaee5df-f442-44c1-958a-7a9dbefce22c',
                    instance_version: 1,
                    property_map: {
                        info: {
                            notes: {},
                            label: {
                                value: 'Throttle Bot'
                            }
                        },
                        view_serial: 100,
                        input: {
                            input0: {
                                view_type: {
                                    value: 'document'
                                },
                                label: {
                                    value: 'input0'
                                }
                            }
                        },
                        settings: {
                            execution_mode: {
                                value: 'Execute only'
                            },
                            speed: {
                                value: 120000
                            },
                            executable_during_suggest: {
                                value: false
                            },
                            throttle_type: {
                                value: 'Fixed'
                            }
                        },
                        error: {
                            error0: {
                                view_type: {
                                    value: 'document'
                                },
                                label: {
                                    value: 'error0'
                                }
                            },
                            error_behavior: {
                                value: 'fail'
                            }
                        },
                        output: {
                            output0: {
                                view_type: {
                                    value: 'document'
                                },
                                label: {
                                    value: 'output0'
                                }
                            }
                        }
                    },
                    class_build_tag: 'develop14729'
                },
                'cd1c5bfb-56d1-492d-8672-16904dd21c8b': {
                    class_fqid: 'com-snaplogic-snaps-transform-sequence_1-develop14729',
                    class_id: 'com-snaplogic-snaps-transform-sequence',
                    class_version: 1,
                    instance_fqid: 'cd1c5bfb-56d1-492d-8672-16904dd21c8b_1',
                    instance_id: 'cd1c5bfb-56d1-492d-8672-16904dd21c8b',
                    instance_version: 1,
                    property_map: {
                        info: {
                            label: {
                                value: 'Sequence'
                            }
                        },
                        output: {
                            output0: {
                                view_type: {
                                    value: 'document'
                                },
                                label: {
                                    value: 'output0'
                                }
                            }
                        },
                        settings: {
                            initialValueProp: {
                                value: 1
                            },
                            execution_mode: {
                                value: 'Validate & Execute'
                            },
                            numberOfDocumentsProp: {
                                value: 1
                            },
                            stepValueProp: {
                                value: 1
                            }
                        },
                        view_serial: 100,
                        error: {
                            error0: {
                                view_type: {
                                    value: 'document'
                                },
                                label: {
                                    value: 'error0'
                                }
                            },
                            error_behavior: {
                                value: 'fail'
                            }
                        }
                    },
                    class_build_tag: 'develop14729'
                }
            },
            path_id: payload.path,
            path_snode: '622123429f61831aec41ff90',
            target_runtime: 'standard'
        }
    }
   

}
export const failingPipeline = (payload) => {
    return {
        pipe: {
            class_fqid: 'com-snaplogic-pipeline_9',
            snode_id: '6254802bdf51b2ad922be93a',
            instance_id: '17d0d4dd-50ec-456e-926f-581f790ceb10',
            instance_version: 2,
            link_map: {},
            link_serial: 100,
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: payload.name
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: payload.email
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    },
                    suspendable: {
                        value: false
                    },
                    test_pipeline: {
                        value: false
                    },
                    imports: {
                        value: []
                    },
                    error_param_table: {
                        value: []
                    },
                    error_pipeline: {
                        expression: false,
                        value: null
                    }
                },
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                output: {
                    '20dbc4cc-ac48-45cb-b838-9f75c884dae1_output0': {
                        view_type: {
                            value: 'document'
                        },
                        label: {
                            value: 'JSON Generator - output0'
                        }
                    }
                }
            },
            render_map: {
                pan_x_num: 0,
                default_snaplex: '616dfb13a7b54eb8763ebbdd',
                scale_ratio: 1,
                detail_map: {
                    '20dbc4cc-ac48-45cb-b838-9f75c884dae1': {
                        grid_x_int: 1,
                        index: null,
                        recommendation_id: null,
                        source: 'snap catagory',
                        grid_y_int: 2,
                        rot_tail_int: 0,
                        input: {},
                        rot_int: 0
                    }
                },
                pan_y_num: 0
            },
            snap_map: {
                '20dbc4cc-ac48-45cb-b838-9f75c884dae1': {
                    class_fqid: 'com-snaplogic-snaps-transform-jsongenerator_2-develop14729',
                    class_id: 'com-snaplogic-snaps-transform-jsongenerator',
                    class_version: 2,
                    instance_fqid: '20dbc4cc-ac48-45cb-b838-9f75c884dae1_1',
                    instance_id: '20dbc4cc-ac48-45cb-b838-9f75c884dae1',
                    instance_version: 1,
                    property_map: {
                        info: {
                            notes: {},
                            label: {
                                value: 'JSON Generator'
                            }
                        },
                        view_serial: 100,
                        input: {},
                        settings: {
                            arrayElementsAsDocuments: {
                                value: true
                            },
                            execution_mode: {
                                value: 'Validate & Execute'
                            },
                            editable_content: {
                                value: '## Enter your JSON-encoded data in this space.  Note that this text is\n## treated as an Apache Velocity template, so you can substitute values\n## from input documents or the pipeline parameters.  See the following\n## URL for more information about Velocity:\n##   https://velocity.apache.org/engine/devel/user-guide.html\n\n[\n    {\n        \"msg\" : \"Hello, World\", \"num\" : {},1\n    }\n]\n\n\n## Tips:\n##  * The sample data above will generate a single empty document, uncomment\n##    the line in the middle to include the sample fields.  Adding more\n##    objects to the root array will cause the snap to generate more\n##    than one document.\n##  * Pipeline parameters can be referenced by prefixing the parameter\n##    name with an underscore, like so:\n##      ${_pipelineParamName}\n##  * If you add an input view to the snap, this template will be\n##    evaluated for each input document.\n##  * Fields in the input documents can be referenced by prefixing them\n##    with a dollar-sign ($), like so:\n##      $parent.child[0].value\n##  * Any referenced document values and pipeline parameters will\n##    automatically be JSON-encoded when they are inserted into the final\n##    JSON document.  You should not have to worry about escaping values\n##    yourself.\n##  * If you are having troubles getting a template to produce valid JSON,\n##    you can add an error view to the snap to get a document that\n##    contains the output of the template evaluation.\n'
                            },
                            supportTypeExts: {
                                value: false
                            },
                            passThroughProp: {
                                value: false
                            }
                        },
                        error: {
                            error0: {
                                view_type: {
                                    value: 'document'
                                },
                                label: {
                                    value: 'error0'
                                }
                            },
                            error_behavior: {
                                value: 'fail'
                            }
                        },
                        output: {
                            output0: {
                                view_type: {
                                    value: 'document'
                                },
                                label: {
                                    value: 'output0'
                                }
                            }
                        }
                    },
                    class_build_tag: 'develop14729'
                }
            },
            path_id: payload.path,
            path_snode: '622123429f61831aec41ff90',
            target_runtime: 'standard'
        }
    }
}

export const simplePipeline = (payload) => {
    return {
        pipe : {
            class_fqid: 'com-snaplogic-pipeline_9',
            snode_id: '6266381891b8218eb4983fcf',
            instance_id: '78d28a5d-df86-4fa8-ae49-ed210ba68a4b',
            instance_version: 2,
            link_map: {},
            link_serial: 100,
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: payload.name
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: payload.email
                    }
                },
                input: {
                    '0824300b-472a-4523-8857-612ba7ea9822_input0': {
                        view_type: {
                            value: 'binary'
                        },
                        label: {
                            value: 'JSON Parser - input0'
                        }
                    }
                },
                settings: {
                    param_table: {
                        value: []
                    },
                    suspendable: {
                        value: false
                    },
                    test_pipeline: {
                        value: false
                    },
                    imports: {
                        value: []
                    },
                    error_param_table: {
                        value: []
                    },
                    error_pipeline: {
                        expression: false,
                        value: null
                    }
                },
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                output: {
                    '0824300b-472a-4523-8857-612ba7ea9822_output0': {
                        view_type: {
                            value: 'document'
                        },
                        label: {
                            value: 'JSON Parser - output0'
                        }
                    }
                }
            },
            render_map: {
                pan_x_num: 0,
                default_snaplex: '5f46d227fc119b553d3a8102',
                scale_ratio: 1,
                detail_map: {
                    '0824300b-472a-4523-8857-612ba7ea9822': {
                        grid_x_int: 1,
                        index: null,
                        recommendation_id: null,
                        source: 'snap catagory',
                        grid_y_int: 2,
                        rot_tail_int: 0,
                        output: {},
                        input: {},
                        rot_int: 0
                    }
                },
                pan_y_num: 0
            },
            snap_map: {
                '0824300b-472a-4523-8857-612ba7ea9822': {
                    class_fqid: 'com-snaplogic-snaps-transform-jsonparser_1-develop14729',
                    class_id: 'com-snaplogic-snaps-transform-jsonparser',
                    class_version: 1,
                    instance_fqid: '0824300b-472a-4523-8857-612ba7ea9822_1',
                    instance_id: '0824300b-472a-4523-8857-612ba7ea9822',
                    instance_version: 1,
                    property_map: {
                        info: {
                            label: {
                                value: 'JSON Parser'
                            }
                        },
                        view_serial: 100,
                        input: {
                            input0: {
                                view_type: {
                                    value: 'binary'
                                },
                                label: {
                                    value: 'input0'
                                }
                            }
                        },
                        settings: {
                            execution_mode: {
                                value: 'Validate & Execute'
                            },
                            allowNonStandardJson: {
                                value: true
                            },
                            arrayElementsAsDocuments: {
                                value: true
                            },
                            jsonFilterPath: {
                                value: ''
                            }
                        },
                        error: {
                            error0: {
                                view_type: {
                                    value: 'document'
                                },
                                label: {
                                    value: 'error0'
                                }
                            },
                            error_behavior: {
                                value: 'fail'
                            }
                        },
                        output: {
                            output0: {
                                view_type: {
                                    value: 'document'
                                },
                                label: {
                                    value: 'output0'
                                }
                            }
                        }
                    },
                    class_build_tag: 'develop14729'
                }
            },
            path_id: payload.path,
            path_snode: '622123429f61831aec41ff90',
            target_runtime: 'standard'
        }
    }
}
export const dashboardProject = () => {
    return [
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:20.961000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    label: {
                        value: 'Copy of NestedChild'
                    }
                },
                output: {},
                settings: {
                    param_table: {
                        value: []
                    }
                },
                input: {
                    '7a6fee6e-0355-4a38-820b-fe9998ffb2e0_input0': {
                        label: {
                            value: 'File Writer - input0'
                        },
                        view_type: {
                            value: 'binary'
                        }
                    }
                },
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/62966151c9eb5016b96db91b',
            instance_id: '08d6cb7f-1ace-4847-bbe7-14e4eb12e49d',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '08d6cb7f-1ace-4847-bbe7-14e4eb12e49d_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '62966151c9eb5016b96db91b'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:21.356000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: 'Failed_Pipeline'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/62966151728997d5c1871f19',
            instance_id: '0cde989d-0fd8-44aa-b2e1-6baf5aba4717',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '0cde989d-0fd8-44aa-b2e1-6baf5aba4717_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '62966151728997d5c1871f19'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:21.267000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: 'ForEachChild'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: 'jenkins@snaplogic.com'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/62966151e581976598d94487',
            instance_id: '31b99585-dfaf-418f-815c-2a7c1dd91f71',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '31b99585-dfaf-418f-815c-2a7c1dd91f71_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '62966151e581976598d94487'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:21.169000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    label: {
                        value: 'Generalpipeline_NoDelay'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/629661516451cbce38769d36',
            instance_id: '40426a4a-d5cf-4c93-830f-f6f26a520c92',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '40426a4a-d5cf-4c93-830f-f6f26a520c92_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '629661516451cbce38769d36'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:22.498000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    label: {
                        value: 'TriggeredTaskpipeline_Delay'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/629661520cfcf6df419e1002',
            instance_id: '5445c994-1984-4de6-8e81-cc0441bd33da',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '5445c994-1984-4de6-8e81-cc0441bd33da_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '629661520cfcf6df419e1002'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:22.324000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: 'NestedMaster_Withoutwait'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/62966152e8123034ec36f522',
            instance_id: '5814d9a9-3491-4988-a91a-c26b62c26ac2',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '5814d9a9-3491-4988-a91a-c26b62c26ac2_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '62966152e8123034ec36f522'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:21.578000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: 'Generalpipeline_Delay'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: 'jenkins@snaplogic.com'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/62966151a5c3d7b3bec92099',
            instance_id: '62a4470b-c742-4757-9fa4-ca12a4f22fdf',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '62a4470b-c742-4757-9fa4-ca12a4f22fdf_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '62966151a5c3d7b3bec92099'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:22.218000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: 'ForEach_Delay'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: 'autoregplatform+admin9@gmail.com'
                    }
                },
                output: {
                    '263f7910-cb2a-48c4-ab5d-5f0fd96c7b39_output0': {
                        label: {
                            value: 'Script - output0'
                        },
                        view_type: {
                            value: 'document'
                        }
                    }
                },
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/62966152bd6534a04351db63',
            instance_id: '718beb9e-de5c-4906-a25d-dfa2ac710a7b',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '718beb9e-de5c-4906-a25d-dfa2ac710a7b_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '62966152bd6534a04351db63'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:22.023000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: 'NestedMaster_withWait'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: 'jenkins@snaplogic.com'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/6296615269c5bea3e4bc07bb',
            instance_id: '7404d300-2825-434d-bdd4-f3c014edde71',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '7404d300-2825-434d-bdd4-f3c014edde71_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '6296615269c5bea3e4bc07bb'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:21.077000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    label: {
                        value: 'Manualpipeline_Delay'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/62966151fd686dc73da03077',
            instance_id: '83c9756d-9f1b-4354-a535-f4c1c5efe394',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '83c9756d-9f1b-4354-a535-f4c1c5efe394_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '62966151fd686dc73da03077'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:21.755000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    label: {
                        value: 'ForEach_NoDelay'
                    }
                },
                output: {
                    'e1a2c833-373f-4d43-9196-f55d274c2de2_output0': {
                        label: {
                            value: 'ForEach - output0'
                        },
                        view_type: {
                            value: 'document'
                        }
                    }
                },
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/62966151a5c3d7b3bec9209b',
            instance_id: '8974bb60-b9ef-4450-8c86-783dfc972778',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '8974bb60-b9ef-4450-8c86-783dfc972778_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '62966151a5c3d7b3bec9209b'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:20.776000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: 'TriggeredTaskpipeline_NoDelay'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/6296615074892b5021fc8c30',
            instance_id: '8e809482-3199-460e-97ae-e3241087b40f',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '8e809482-3199-460e-97ae-e3241087b40f_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '6296615074892b5021fc8c30'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:21.930000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: 'Manual_Pipeline'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/62966151c9eb5016b96db91d',
            instance_id: '9df805b3-77e1-45f8-8d6b-6f4f7dea2e4e',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: '9df805b3-77e1-45f8-8d6b-6f4f7dea2e4e_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '62966151c9eb5016b96db91d'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:21.457000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: 'Dashboard_Ultra_Pipeline_Delay'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/629661515c1dcdb87431a214',
            instance_id: 'a1892b29-cc24-4c59-90cd-f37e2677af1d',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: 'a1892b29-cc24-4c59-90cd-f37e2677af1d_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '629661515c1dcdb87431a214'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:21.849000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    label: {
                        value: 'Dashboard_Ultra_Pipeline'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {},
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/62966151f58a67f1e8e77a14',
            instance_id: 'b359860d-8ebe-4d69-8f04-8812ac24b5e3',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: 'b359860d-8ebe-4d69-8f04-8812ac24b5e3_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '62966151f58a67f1e8e77a14'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:21.677000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: 'NestedChild'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    }
                },
                output: {},
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {
                    '71201c76-33d4-4e84-a64d-65167a3861b0_input0': {
                        view_type: {
                            value: 'binary'
                        },
                        label: {
                            value: 'File Writer - input0'
                        }
                    }
                },
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/62966151faed5e4d3eb4efe3',
            instance_id: 'cd201ae8-a7ff-44d3-ac02-6bee0d23223e',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: 'cd201ae8-a7ff-44d3-ac02-6bee0d23223e_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '62966151faed5e4d3eb4efe3'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:22.413000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: 'pipelinefortest'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: 'automation@snaplogic.com'
                    }
                },
                output: {
                    '4d9921f1-26d8-4ed8-8d75-bbdaf540f2ca_output0': {
                        view_type: {
                            value: 'document'
                        },
                        label: {
                            value: 'Script - output0'
                        }
                    }
                },
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                input: {
                    '4d9921f1-26d8-4ed8-8d75-bbdaf540f2ca_input0': {
                        view_type: {
                            value: 'document'
                        },
                        label: {
                            value: 'Script - input0'
                        }
                    }
                },
                settings: {
                    param_table: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/62966152e581976598d94489',
            instance_id: 'eef2282f-837d-4f35-8b6e-a7801a0c3490',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: 'eef2282f-837d-4f35-8b6e-a7801a0c3490_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '62966152e581976598d94489'
        },
        {
            migrate_version: 'main-12117',
            update_time: '2022-05-31T18:41:22.113000+00:00',
            scrub_version: 'dd6f434acae80e6b7382efe3ee4050f30b91d7fb7a65709412322daf86e55107',
            property_map: {
                info: {
                    notes: {
                        value: null
                    },
                    label: {
                        value: 'ForEachChildDelay'
                    },
                    purpose: {
                        value: null
                    },
                    pipeline_doc_uri: {
                        value: null
                    },
                    author: {
                        value: 'sbuddi@snaplogic.com'
                    }
                },
                input: {
                    'ab7e5bcf-33d9-4271-a096-1d0357eb003b_input101': {
                        view_type: {
                            value: 'document'
                        },
                        label: {
                            value: 'Script - input0'
                        }
                    }
                },
                error: {
                    error_behavior: {
                        value: 'none'
                    }
                },
                output: {
                    'ab7e5bcf-33d9-4271-a096-1d0357eb003b_output0': {
                        label: {
                            value: 'Script - output0'
                        },
                        view_type: {
                            value: 'document'
                        }
                    }
                },
                settings: {
                    param_table: {
                        value: []
                    },
                    imports: {
                        value: []
                    }
                }
            },
            uri: 'http://canary.elastic.snaplogicdev.com:8088/api/1/rest/pipeline/629661527d1be64678546e86',
            instance_id: 'fa73696f-2352-4473-b97c-2751d05ae021',
            path_id: 'cytestorg/RandomProjectSpace1654022458743/DashboardTests',
            instance_fqid: 'fa73696f-2352-4473-b97c-2751d05ae021_1',
            update_user_id: 'dannankra+cyadmin3@snaplogic.com',
            snode_id: '629661527d1be64678546e86'
        }
    ]
}