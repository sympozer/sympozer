



var ocsConfig = {

    // choosed by the user in the select format
    // checkFormat : function(documentRootNode){
 
    //     var formatOk = false;
    //     $(documentRootNode).each(function(){
    //         if(this.nodeName.toUpperCase()=== "CONFERENCE"){
    //             console.log("input file is OCS");
    //             formatOk= true;
    //         }
    //     })

    //     return formatOk;  
    // }
    
    //the parsing util function set
    util : "xmlUtil",
    getNodeKey : {
        format : [{
            fn : "attr",
            arg : ["id"]
        }]
    },

    getNodeName : {
        format : [{
            fn : "localName"
        }]
    }, 

    //preproccessing of the root node which contains the conference informations 
    parseConference : {
        //conference mapping
        setLabel : {
            format : [{
                fn : "children",
                arg : ["name"]
            },{
                fn : "text"
            }] 
        },
        setAcronym : {
            format : [{
                fn : "children",
                arg : ["acronym"]
            },{
                fn : "text"
            }] 
        },
        setDescription : {
            format : [{
                fn : "children",
                arg : ["description"]
            },{
                fn : "text"
            }] 
        },
        setUrl : {
            format : [{
                fn : "children",
                arg : ["homepage"]
            },{
                fn : "text"
            }] 
        }
    },
    
    //
    mappings : [
        {
            array   : "organizations", 
            format : [{
                fn : "children",
                arg : ["organizations"]
            },{
                fn : "children",
                arg : ["organization"]
            }], 
            label : [
                {
                    format : [{
                        fn : "children",
                        arg : ["name"]
                    }],
                    setter : 'setName'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["country"]
                    }],
                    setter : 'setCountry'
                }
            ]

        },
        {
            //nodes are wrapped in a collection node 
            array   :"persons", 
            format : [{
                fn : "children",
                arg : ["persons"]
            },{
                fn : "children",
                arg : ["person"]
            }], 
            label : [
                {
                    format : [{
                        fn : "children",
                        arg : ["firstname"]
                    }],
                    setter : 'setFirstName'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["lastname"]
                    }],
                    setter : 'setFamilyName'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["email"]
                    }],
                    setter : 'setEmail'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["organization-id"]
                    },{
                        fn : "text"
                    }],
                    multiple : true,
                    setter : 'addOrganization',
                    fk : {
                        array : "organizations"
                    }
                }
            ]
        },
        {
            array   :"proceedings", 
            format : [{
                fn : "children",
                arg : ["papers"]
            },{
                fn : "children",
                arg : ["paper"]
            }], 
            label : [
                {
                    format : [{
                        fn : "children",
                        arg : ["title"]
                    }],
                    setter : 'setTitle'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["abstract"]
                    }],
                    setter : 'setAbstract'
                }, 
                //topics entity are created directly here (or retrieved)
                //then we register the correct index
                {
                    format : [{
                        fn : "children",
                        arg : ["keywords"]
                    },{
                        fn : "children",
                        arg : ["keyword"]
                    },{
                        fn : "text"
                    }], 
                    multiple : true, 
                    setter : 'addTopic',
                    //pointed entity isn't a concrete node in this format and thus, don't contains any index 
                    //so we must retrieve an index with getArrayId instead of objectMap 
                    fk : {
                        array : "topics", 
                        create : "setName"
                    }
                },
                //authors are retrieved from their id in the objectMap .
                {
                    format : [{
                        fn : "children",
                        arg : ["authors"]
                    },{
                        fn : "children",
                        arg : ["author"]
                    },{
                        fn : "text"
                    }], 
                    multiple : true,
                    setter : 'addAuthor',
                    fk : {
                        array : "persons"
                    }
                }
            ]
        },
        {  
            array   : "events", 
            format : [{
                fn : "children",
                arg : ["sessions"]
            },{
                fn : "children",
                arg : ["session"]
            }], 
            label : [
                {
                    format : [{
                        fn : "children",
                        arg : ["name"]
                    }],
                    setter : 'setLabel'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["papers"]
                    },{
                        fn : "children",
                        arg : ["paper"]
                    },{
                        fn : "text"
                    }], 
                    multiple : true,
                    setter : 'addPaper',
                    fk : {
                        array : "proceedings"
                    }
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["pc-chairs"]
                    },{
                        fn : "children",
                        arg : ["pc-chair"]
                    },{
                            fn : "text"
                        }], 
                    multiple : true,
                    setter : 'addChair',
                    fk : {
                        array : "persons"
                    }
                }
            ]
          // set all events to sessionEvent
            // postProcess : function(node,event){
            //     var catName = "SessionEvent";
            //     var catId = getArrayId("categories",'setName',catName);
            //     if(catId==-1){
            //       var category= {}; 
            //       category['setName']=catName;
            //       objects.categories.push(category);
            //       catId = objects.categories.length-1;
            //     }
            //     event['addCategorie']=catId; 
            // },
        },

    ]





};