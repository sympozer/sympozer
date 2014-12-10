
/**
 *      rdf/owl importer config for OWLImporter.js
 */


var rdfConfig = {
    isRDF : false,
 
    util : "xmlUtil",
    getNodeKey : {
        format : [{
            fn : "attr",
            arg : ["rdf:about"]
        }] 
    }, 
    getNodeName : {
        format : [{
            fn : "rdfNodeName"
        }] 
    },  
    mappings : [
        {
            array   : "locations",  
            format : [{
                fn : "children",
                arg : ["meetingroomplace",true]
            }], 
            label : [
                {
                    format : [{
                        fn : "children",
                        arg : ["rdfs:label"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setName'
                }, 
                {
                    format : [{
                        fn : "children",
                        arg : ["rdfs:comment"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setDescription'
                }
            ]
        },
        {
            array   : "organizations",  
            format : [{
                fn : "children",
                arg : ["organization",true]
            }], 
            label : [
                {
                    format : [{
                        fn : "children",
                        arg : ["rdfs:label"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setName'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["foaf:name"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setName'
                }
            ]
        },
        {
            array   : "persons", 
            format : [{
                fn : "children",
                arg : ["person",true]
            }],  
            label : [

                //some dataset use rdfs:label instead of foaf ontology i.e. dh2012.rdf
                // TODO ADD SPLITER NODEUTIL 
                {
                    format : [{
                        fn : "children",
                        arg : ["rdfs:label"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setFirstName',
                    // format : function(node){  
                    //     return $(node).text().split(" ")[0];
                    // },
                    preProcess : function(val,person){
                        person["setFamilyName"] =val.split(" ")[1] || "";
                    }
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["foaf:firstName"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setFirstName'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["foaf:lastName"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setFamilyName'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["foaf:name"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setName'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["foaf:img"]
                    },{
                        fn : "text"
                    }],
                    escape : false,
                    setter : 'setImg'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["foaf:homepage"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setPage'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["foaf:twitter"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setTwitter'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["foaf:description"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setDescription'
                }, 
                {
                    format : [{
                        fn : "children",
                        arg : ["swrc:affiliation"]
                    },{
                        fn : "attr",
                        arg : ["rdf:resource"]
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
            array   : "proceedings",  
            format : [{
                fn : "children",
                arg : ["inproceedings",true]
            }],  

            label : [
                {
                    format : [{
                        fn : "children",
                        arg : ["dc:title"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setTitle'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["rdfs:label"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setTitle'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["swrc:abstract"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setAbstract'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["dc:subject"]
                    },{
                        fn : "text"
                    }],
                    multiple : true,
                    setter : 'addTopic', 
                    fk : {
                        array : "topics",
                        //pointed entity isn't a concrete node in this format and thus, don't contains any index 
                        //so we must retrieve an index with Importer().getArrayId instead of objectMap 
                        create : "setName"
                    }
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["swrc:listkeyword"]
                    }],
                    multiple : true, 
                    list : {delimiter:", "},
                    setter : 'addTopic',
                    fk : {
                        array : "topics", 
                        create : "setName"
                    }
                },
                //authors are retrieved from their id in the objectMap .
                {
                    format : [{
                        fn : "children",
                        arg : ["dc:creator"]
                    },{
                        fn : "attr",
                        arg : ["rdf:resource"]
                    }],
                    multiple : true,
                    setter : 'addAuthor',
                    fk : {
                        array : "persons"
                    }
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["foaf:maker"]
                    },{
                        fn : "attr",
                        arg : ["rdf:resource"]
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
                arg : ["event",true]
            }],  
            label : [
                {
                    format : [{
                        fn : "children",
                        arg : ["rdfs:label"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setLabel'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["summary"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setLabel'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["swc:hasacronym"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setAcronym'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["swc:haslogo"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setLogoPath',
                    format : [{
                        fn : "attr",
                        arg : ["rdf:resource"]
                    }]
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["dce:description"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setDescription'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["description"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setDescription'
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["dtstart",true]
                    },{
                        fn : "text"
                    },{
                        fn : "parseTime"
                    }],
                    setter : 'setStartAt'
                }, 
                {
                    format : [{
                        fn : "children",
                        arg : ["dtend",true]
                    },{ 
                        fn : "text",
                    },{
                        fn : "parseTime"
                    }],
                    setter : 'setEndAt', 
                }, 
                {
                    format : [{
                        fn : "children",
                        arg : ["dc:subject"]
                    },{
                        fn : "text"
                    }],
                    multiple: true,
                    setter : 'addTopic',
                    fk : {
                        array : "topics", 
                        create : "setName"
                    }
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["swc:hasLocation"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setLocation',
                    fk : {
                        array : "locations", 
                        create : "setName"
                    }
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["swc:hasLocation"]
                    },{
                        fn : "attr",
                        arg : ["rdf:resource"]
                    },{
                        fn : "split",
                        arg : ["/","last"]
                    }],
                    setter : 'setLocation',
                    fk : {
                        array : "locations", 
                        create : "setName"
                    }
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["location"]
                    },{
                        fn : "attr",
                        arg : ["rdf:resource"]
                    },{
                        fn : "split",
                        arg : ["/","last"]
                    }],
                    setter : 'setLocation',
                    fk : {
                        array : "locations", 
                        create : "setName"
                    }
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["location"]
                    },{
                        fn : "attr",
                        arg : ["text"]
                    },{
                        fn : "split",
                        arg : ["/","last"]
                    }],
                    setter : 'setLocation',
                    fk : {
                        array : "locations", 
                        create : "setName"
                    }
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["foaf:homepage"]
                    },{
                        fn : "text"
                    }],
                    setter : 'setUrl',
                    format : [{
                        fn : "attr",
                        arg : ["rdf:resource"]
                    }]
                },
                {
                    format : [{
                        fn : "children",
                        arg : ["swc:issubeventof"]
                    },{
                        fn : "attr",
                        arg : ["rdf:resource"]
                    }],
                    setter : 'setParent',
                    fk : { 
                        array : "events"
                    }
                } 
            ],
            //TODO find a better way to get the category 
            postProcess : function(node,event,nodeName){
                node = $(node);
                var catName
                    ,tmp
                    ,isMainConfEvent = false;
                //3 different ways to get the category name 
                tmp = node[0].nodeName.split("swc:").join("").split("&swc;").join("").split("event:").join("");
                if(testCatName(tmp))catName = tmp;

                tmp = nodeName; 
                if(testCatName(tmp))catName = tmp;

                tmp = nodeName.split("&swc;").join("").split("swc:").join("").split("event:").join("");
                if(testCatName(tmp))catName = tmp; 
     
                if(catName){
                    var catId = Importer().getArrayId("categories","setName",catName) 
                    if(catId==-1){ 
                        var category= {}; 
                        category['setName']=catName;
                        // console.log(catName);
                        if(catName.toLowerCase() == "conferenceevent") {
                            isMainConfEvent = true;
                            console.log("mainconference event is ",event)
                        }
                        Importer().objects.categories.push(category);
                        catId = Importer().objects.categories.length-1;
                    }
                    if(!isMainConfEvent)event['addCategorie']=catId;
                }
                return isMainConfEvent;

                function testCatName(catName){
                    if(!catName)return;
                    var cn = catName.toLowerCase(); 

                    return (cn.indexOf("event") !== -1 && cn !== "event")
                }
            }
        },
        
        //TODO DO NOT PERMIT OVERRIDING 
        {
            array   : "roles",  
            format : [{
                fn : "children",
                arg : ["presenter",true]
            }],  
            override : function(node){

                var event ;
                $(node).children().each(function(){
                    if(this.nodeName=="swc:isroleat"){  
                        event = objectMap[$(this).attr("rdf:resource")]
                    } 
                });
                if(event){
                    event['addPresenter'] = [];
                    $(node).children().each(function(){
                        if(this.nodeName=="swc:heldby"){ 
                            var person = $(this).attr("rdf:resource"); 
                            if(objectMap[person]){
                                event['addPresenter'].push( $.inArray(objectMap[person], persons)); 
                            }
                        } 
                    }); 
                }
            }
        },
        {
            array   : "roles",  
            format : [{
                fn : "children",
                arg : ["chair",true]
            }],  
            override : function(node){

                var event ;
                $(node).children().each(function(){
                    if(this.nodeName=="swc:isroleat"){  
                        event = objectMap[$(this).attr("rdf:resource")]
                    } 
                });
                if(event){
                    event['addChair'] = [];
                    $(node).children().each(function(){
                        if(this.nodeName=="swc:heldby"){ 
                            var person = $(this).attr("rdf:resource"); 
                            if(objectMap[person]){
                                event['addChair'].push( $.inArray(objectMap[person], persons)); 
                            }
                        } 
                    }); 
                }
            }
        }, 
    ]
}
 