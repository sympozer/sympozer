xmlMapper = {

 
 

    readFile : function(file,reader){   
        reader.onload = function(e) { 
            $(xmlMapper).trigger("fileRead",[e.target.result]);  
        }
        reader.readAsText(file);
    },

    defaultMapping : {
        util : "xmlUtil",
        getNodeKey : {
            format : [{
                //don't care about foreign keys
                fn : "generate", 
            }]
        },
        getNodeName : {
            format : [{
                fn : "rdfNodeName"
            }] 
        }
    },
    map : function(data,nodePath,nodeCallBack,entryCallBack){
        var $data = $(data);
        console.log("mapping : ",$data); 
           
        findNode($data,nodePath); 
        
        $(xmlMapper).trigger("mapEnd"); 

        function findNode($node,nodePath){
  

            if($node.children().length > 0){
                var childrenNodePath = [];

                $node.children().each(function(index,child){ 
                    var childNodeName = xmlMapper.getNodeName(child);
                    var childNodePath = nodePath + mapper.nodePath.separator + childNodeName; 
                    var panelTmp = nodeCallBack(childNodePath);
                    //check if not already mapped
                    // if(panelTmp){
                        childrenNodePath.push(childNodePath);
                    //     findNode($(child),childNodePath,panelTmp);
                    // }

                    findNode($(child),childNodePath);

                });
                // mapper.checkIfMappingCollection(nodePath,childrenNodePath);
            }else{ 
                $.each($node[0].attributes, function(i, attrib){
                    entryCallBack(nodePath+mapper.nodePath.separator+mapper.nodePath.attr+attrib.name,attrib.value);
                }); 
                if($node.text && $.trim($node.text())!="")
                    entryCallBack(nodePath+mapper.nodePath.separator+mapper.nodePath.text,$.trim($node.text()));

            }
 
        }
    },  

    // *required by Importer internal* 
    getNodeName : function(node){
                var nodeName = Importer().doFormat(node,Importer().mappingConfig.getNodeName.format);
                
                return (nodeName 
                            ? nodeName.toLowerCase() 
                            : console.log("undefined nodename for",node));
    },

    // *required by Importer internal* 
    getNbRootChildren : function(node){  
                return $(node).children().length
    },

     //data manipulation functions used by Importer().doFormat
    utils : {  
        /*********************  node manipulation : return a string *******************/
        //get a rdf nodeName
        rdfNodeName : function(node,arg){
            var node = $(node)[0];
            if(!node.localName)return;//comment
            var uri=[];
            var rtn;

            //first, look for  <rdf:type> child(ren)
            $(node).children().each(function(){
                if(this.localName.indexOf("rdf:type")!== -1 ){ 
                    if($(this).attr('rdf:resource').indexOf("#")!== -1 ){ 
                        uri.push($(this).attr('rdf:resource').split('#')[1]); 
                    }
                    else{
                        var nodeName = $(this).attr('rdf:resource').split('/'); 
                        uri.push(nodeName[nodeName.length-1]);  
                    }
                } 
            });  
            for(var i in uri){
                var lc = uri[i].toLowerCase();
                if(lc.indexOf('keynotetalk')>-1){
                    rtn = 'KeynoteEvent'; 
                }
            }
            var lc = node.localName.toLowerCase();
            if(lc.indexOf('keynotetalk')>-1){
                rtn = 'KeynoteEvent'; 
            }
            else if(uri.length==1)
            {
                rtn = uri[0];
            }
            else if(uri.length==0) //rdf
            { 
                rtn = node.localName;
            } 
            return rtn;
        },
        text : function(node){ 
            var rtn = [];
            $(node).each( function(){
                rtn.push($(this).text());
            })
            return rtn.length > 1 ? rtn : rtn.length == 1 ? rtn[0] : undefined;
        },
        split : function(texts,arg){
            var rtn = [];
            if(typeof texts === "string")
            {
                return splitInternal(texts,arg)
            }
            else{ 
                $(texts).each( function(i,val){
                    if(!val)return;
                    var text = $(this).text().split(arg[0]);
                    rtn.push(splitInternal(text,arg));
                })
                return rtn.length > 1 ? rtn : rtn.length == 1 ? rtn[0] : undefined;  
            }
            function splitInternal(text,arg)
            { 
                switch(arg[1])
                {
                    case "last":
                        rtn = text[text.length-1];
                    break;
                    case "first":
                        rtn = text[0];
                    break;
                    default:
                        rtn = text[arg[1]];
                }
            }
        },
        localName : function(node){
            return $(node)[0].localName;
        },
        // get a specific attr for the given node
        //arg[0] must contain the wanted attr
        attr : function(node,arg){
            var rtn = [];
            $(node).each( function(){
                rtn.push($(this).attr(arg[0]));
            })
            return rtn.length > 1 ? rtn : rtn.length == 1 ? rtn[0] : undefined;
        },
        parseTime : function(node){ 
            var rtn;
            $(node).children().each(function(){
                if(this.nodeName !=="ical:date") return;
                rtn = $(this).text();  
            });
            rtn = rtn || $(node).text() || node;
            return rtn ? moment(rtn ).format() : "";
        },

        /********************* nodeSet && node manipulation : return jquery Node or NodeSet *******************/
        
        // get a specific node in a nodeSet
        //arg[0] must contain the wanted nodeName
        node : function(nodes,arg){
            var rtnNode;
            var seekedNodeName = arg[0].toLowerCase();
            $(nodes).each(function(){ 
                var nodeName = xmlMapper.getNodeName(this);  
                if(nodeName && nodeName.toLowerCase() === seekedNodeName){
                    rtnNode = $(this);
                }
            })
            return rtnNode;
        }, 
        // get specific children in a nodeSet ( case sensitive )
        //arg[0] string : contains the seeked children nodeName. if undefined returns all
        //arg[1] bool   : if true : match with "===" else match with substring containment
        children : function(node,arg){
            var node = $(node)
            if(!arg)return $(node).children();
            var rtnNodeSet= [],
                seekAllChar = '*',
                seekedChildNodeName = arg[0] 
                                        ? arg[0].toLowerCase() 
                                        : seekAllChar,
                matchTest =  arg[1] === true 
                                ? function(a,b){return a.indexOf(b) > -1} 
                                : function(a,b){ return a === b};

            $.each(node,function(){
                $(this).children().each(function(){
                    var childNodeName = xmlMapper.getNodeName(this); 
                    if(childNodeName && matchTest(childNodeName,seekedChildNodeName)){ 
                        rtnNodeSet.push($(this));
                    } 
                })
            })
            if(rtnNodeSet.length==1)return $(rtnNodeSet[0])
            return $(rtnNodeSet);
        }, 
        nbChildren : function(node){ 
            return $(node).children().length;
        },

        /********************* nodeSet && node manipulation : return jquery Node *******************/
        
        // get the first specific child in a nodeSet ( case insensitive )
        //arg[0] must contain the wanted child nodeName 
        // child : function(node,arg){
        //     // return $(node).children(childNodeName);
        //     var rtnNode;
        //     var seekedChildNodeName = arg[0].toLowerCase();
        //     $(node).children().each(function(){
        //         if(rtnNode)return;
        //         var childNodeName = xmlMapper.getNodeName(this);
        //         if(childNodeName && childNodeName === seekedChildNodeName){
        //             rtnNode = $(this);
        //         }
        //     })
        //     return rtnNode;
        // },
        //get a random key because we don't care about fk
        generate : function(node){
            return Math.floor((Math.random()*1024*1024*1024*1024));
        }
    }

}