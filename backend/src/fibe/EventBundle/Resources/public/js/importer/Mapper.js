
var Mapper = function(){

    this["nodePath"] = {
        root : "root",
        separator : "/",
        attr : "@",
        text : "text",
    } 


    var self = this,
        mapper,
        mapping,
        data,
        file,
        fileName,
        serialisedDatas,
        notImportedLog,
        importedLog,
        dataLinks,
        knownNodes,
        knownCollection;
 
    var knownFormatConfig = { 
        'swc': {mapping:rdfConfig,mapper:xmlMapper},
        'ocs': {mapping:ocsConfig,mapper:xmlMapper}
    }

    this.fileName;
    this.setFile = function(f){
        this.fileName = f.name;
        file = f; 
    }
    this.readFile = function(){ 
        var reader = new FileReader();
     
        $(mapper).on("fileRead",function(ev,d){
            data = d;
            $(self).trigger("fileRead",[data]);
        })
        mapper.readFile(file,reader);
 
    }
    this.generateMappingFile = function(){
        mapping = generateMappingFile();
    } 

    this.getUtils = function(){
        return mapper.utils; 
    }

/**
 * read the file and discover knowNodes and knownCollection
 * @trigger               mapEnd(event,knownNodes,knownCollection) 
 *                            
 */
    this.map = function(){
        mapping = mapping || $.extend({},mapper.defaultMapping) ; 
        Importer().setMappingConfig(mapping);

        dataLinks       = {},
        knownNodes      = {},
        knownCollection = {}; 

        var basePath = self.nodePath.root; 

        nodeCallBack(basePath,{panelClass:"panel-success",margin:true}); 

        // console.log("mapping : ",data); 
          

        function nodeCallBack(nodePath,panelOp){

            if(!self.isNodeKnown(nodePath)){
                doPanel();
                return true;
            }
            return false;

            function doPanel(){ 
                knownNodes[nodePath]["panelOp"] = panelOp || {panelClass:"panel-success",margin:true,collapsible:true,collapsed:true}; 
                knownNodes[nodePath]["panelOp"]["node-path"] = knownNodes[nodePath]["node-path"] = nodePath;  
                knownNodes[nodePath]["type"] = "node"; 
                // var tempPanel = Pager.getPanelHtml(nodePath,panelOp);  
                // $el.append(tempPanel);
                // return tempPanel.find("> ul"); 
            } 
        };
        function entryCallBack(nodePath,value){ 
            
            // var collectionNodePath =  cutLastSlash(cutLastSlash(nodePath,true),true);
            if(knownNodes[nodePath]){
                var collectionNodePath = cutLastSlash(nodePath,true); 
                if(knownNodes[cutLastSlash(collectionNodePath,true)].size < knownNodes[collectionNodePath].size ){
                        collectionNodePath = cutLastSlash(nodePath,true);
                }else {
                    collectionNodePath = cutLastSlash(collectionNodePath,true); 
                }
                if(!knownCollection[collectionNodePath])
                    addCollection(collectionNodePath)

                function addCollection(nodePath){
                    console.log("new Collection of "+ nodePath);
                    knownCollection[nodePath] = {}; 
                }
            } 

            if(!$.trim(value)=="")
                self.generateNode(nodePath,value); 
        }; 

        $(mapper).off("mapEnd").on("mapEnd",function(ev,$html){
            $(self).trigger("mapEnd",[knownNodes,knownCollection]);
        });
        mapper.map(data,basePath,nodeCallBack,entryCallBack); 
    }
    this.setMapper = function(m){
        mapper = m;
    }
    this.getKnownNodes = function(){
        return knownNodes;
    };
    this.setImportedLog = function(importedLog){
        this["importedLog"] = importedLog
    }
    notImportedLog = {}
    this.getNotImportedLog = function(){
        if(!this["importedLog"] || this["importedLog"].length==0)
            return console.warn("calling getNotImportedLog without importedLog")
        notImportedLog = [];
        for(var i in knownNodes){
            if (knownNodes[i].type!=="node" && $.inArray(i, this["importedLog"]) === -1){
                notImportedLog.push(i)
            }
        }
        return notImportedLog;
    }
    this.getNodeName = function(node,i){
        return mapper.getNodeName(node,i);
    };
    this.getNbRootChildren = function(node){  
        return mapper.getNbRootChildren(node);
    } 

    this.setKnownMapping = function(formatName){  
        if(!knownFormatConfig[formatName])return console.warn("unknown formatName : "+formatName); 
        mapping = knownFormatConfig[formatName].mapping;
        mapper = knownFormatConfig[formatName].mapper;
        return self;
    }
    this.getMapping = function(){
        return mapping;
    }
    this.getData = function(){
        return data;
    }
    this.getConfName = function(){
        var confName = self["serialisedDatas"] && self["serialisedDatas"].conference 
                            ? self["serialisedDatas"].conference.setLabel || self["serialisedDatas"].conference.setAcronym
                            : undefined;
        return  confName || self.fileName || "file" ;
    }

    this.generateNode = function(nodePath,value){
        // var rtn = ""; 
        if(!self.isNodeKnown(nodePath,value)){ 
            knownNodes[nodePath]["node-path"] = nodePath;
            // rtn += '<li data-node-path="'+nodePath+'" class="map-node list-group-item list-group-item-warning">'+nodeName+'</li>';
        } 
        // return rtn;
    }

    this.isNodeKnown = function(nodePath,sample){
        if(!knownNodes[nodePath]){
            console.log("adding "+nodePath);
            knownNodes[nodePath] = {samples:[],size:0};
            addSample(nodePath,sample);
            return false;
        } 
        addSample(nodePath,sample);
        return true; 
        function addSample(nodePath,sample){
            sample=$.trim(sample);
            knownNodes[nodePath].size += 1;
            if(sample && sample!=""  ){
                knownNodes[nodePath].samples.push(sample);  
            }  
        }
    }

    // this.checkIfMappingCollection = function(nodePath,childrenNodePath){
    //     //TODO review how to get collection
    //     //TODO review how to get collection
    //     //TODO review how to get collection 
    //     if(childrenNodePath.length==1){
    //         console.log("new Collection of "+ nodePath);
    //         knownCollection[nodePath] = {};
    //     }
    // }

    this.getDataLinks = function(){ 
        return dataLinks;
    }
    this.addDataLink = function(modelPath,filePath){
        dataLinks[modelPath] = {nodePath : filePath};
    }
    this.removeDataLink = function(modelPath){
        delete dataLinks[modelPath];
    }
    this.getEntityMapping = function(nodePath){ 
        console.log("getEntityMapping",nodePath,dataLinks)
        var rtn = {};
        for(var i in dataLinks){
            var link = dataLinks[i];
            var test = i;
            i.split(nodePath).join("");
            console.log(test,nodePath,i);
            if(link != i){
                rtn.push(link)
            }
        }
        return rtn;
    }
 
    function isAttr(nodePath){
        return nodePath.substring(nodePath.lastIndexOf(self.nodePath.separator)+1,nodePath.length).charAt(0) == self.nodePath.attr;
    }
 
    function cutLastSlash(str,left){
        return left ===true ? str.substring(0,str.lastIndexOf(self.nodePath.separator))
                            : str.substring(str.lastIndexOf(self.nodePath.separator)+1,str.length);
    }
  
    //construct html
    this.initUi = function ($ctn){

        var $el = Pager.getPanelHtml("Data of "+self.getConfName(),{panelClass:"panel-primary",margin:false,collapsible:false,collapsed:false})
                    .appendTo($ctn)

        
        //construct html
        var htmlUl={};
        for(var i in knownNodes){
            var node=knownNodes[i];
            var nodePath=node["node-path"];
            var isCollection=knownCollection[nodePath]!==undefined;
            var ctn = nodePath == "root" ? $el : htmlUl[cutLastSlash(nodePath,true)];
            var html;
            if(node["type"]=="node"){
                html = Pager.getPanelHtml(nodePath,node["panelOp"] )
                htmlUl[nodePath] = html.find("> ul");

            }else{
                var nodeName = cutLastSlash(nodePath);
                html = $('<li data-node-path="'+nodePath+'" class="map-node list-group-item list-group-item-warning">'+nodeName+'</li>');
            }
            ctn.append(html);
            node["div"] = html;
        }

        //put a different ui to collection
        $('#datafile-form .panel').each(function(){ 
            var nodePath = $(this).data("node-path"); 
            if(knownCollection[nodePath]){
                knownCollection[nodePath] = $(this)
                          .find("> .panel-heading > .panel-title")
                             .prepend('<i title=" collection node of '+nodePath+' " class="fa fa-bars"></i> ')  
                var collectionNodeName = $(this).find("> .panel-heading").text();
                var childPanel = $(this).find("> .list-group > .panel-success ")
                childPanel.data("collection",nodePath) 
            }
        })
                
        //leaf are draggable
        $('.map-node').each(function(){
            var nodePath = $(this).data("node-path");

            //popover
            var samples = knownNodes[nodePath].samples;
            var content = "<ul>";
            for(var i = 0; i < samples.length && i < 10;i++){
                content += "<li>"+samples[i]+"</li>";
            }
            content += "</ul>";
            $(this).popover({
                trigger : 'hover',
                html : true,
                placement : "right",
                title : ' <b>'+nodePath+' </b> <span class="badge">'+knownNodes[nodePath].size+' </span> ',
                content : content
            });

            //draggable
            $(this).draggable({
                zIndex: 999, 
                revert: true,
                revertDuration: 0  
                // helper: 'clone'
            });
        })
    }



    //loop over the model panels  to build a mapping file
    function generateMappingFile(){
        console.log("############### generateMappingFile starts")
        mapping =  $.extend({},mapper.defaultMapping);
        Importer().setMappingConfig(mapping);
        //loop only on validated mapping
        $("#model-form .panel-success").each(function(iPanel,panel){
            var modelName = $(panel).data("model-path");
            // get the corresponding model mapping config
            $(panel).find(".list-group-item-success").each(function(){ 
                var leftEntityMapping;
                for (var i in dataLinks){
                    if(i == $(this).data("model-path")){
                        leftEntityMapping = dataLinks[i];
                    }
                }
                console.log("leftEntityMapping:",leftEntityMapping)

                var leftCollectionPath = getClosestCollectionPath(leftEntityMapping.nodePath);
                if(!leftCollectionPath)return console.warn("leftCollectionPath not found for "+leftEntityMapping.nodePath)
                //check if the collection is a sub collection
                var parentCollectionCollectionPath = getClosestCollectionPath(leftCollectionPath,true);
                if( parentCollectionCollectionPath != "root")leftCollectionPath = parentCollectionCollectionPath;

                var modelSetter = Model.getSetter(modelName,$(this).data("model-path").split(self.nodePath.separator)[1])
                
                
                if(modelName=="Conference"){
                    //the conference mapping has a different mapping object
                    var mappingObj = getOrCreateParseConference(modelName);
                    mappingObj[modelSetter]={};
                    mappingObj[modelSetter]["format"] = extractMappingFormat(leftEntityMapping.nodePath);
                    
                }else{ 
                    var nodePtyPath = leftEntityMapping.nodePath.split(leftCollectionPath).join(""); 
                    var nodeName = nodePtyPath.split(self.nodePath.separator)[0] != "" ?nodePtyPath.split(self.nodePath.separator)[0] : nodePtyPath.split(self.nodePath.separator)[1];

                    var mappingObj = getOrCreateMappingObjFromFormat(extractMappingFormat(leftCollectionPath,true),modelName); 
                    var mappingPty = {
                        setter  :modelSetter, 
                        format  :extractMappingFormat(nodePtyPath)
                    };
                    mappingObj.label.push(mappingPty);

                } 
            }) 
        });
        console.log("############### generateMappingFile ended, returning : ",mapping)
        return mapping;
        
        /**
         * Get or create the conference mapping object  
         * @return {[type]}            [description]
         */
        function getOrCreateParseConference(){  
            if(!mapping['parseConference'])
                mapping['parseConference']={} 
            return mapping['parseConference']
        }
        
        /**
         * Get or create the mapping in the "under generating mapping file" phase corresponding to the array key  
         * @param  {object} format  the format to find
         * @param  {string} array   the array to link with in case of a not found format
         * @return {[type]}         the existing or new mapping
         */
        function getOrCreateMappingObjFromFormat(format,array){  
                if(!mapping['mappings'])
                    mapping['mappings']=[];
   
                 //look if its already registered
                    console.log("getOrCreateMappingObjFromFormat ",format)
                for(var i in mapping['mappings']){ 
                    if(mapping['mappings'][i].array == array && isSameFormat(mapping['mappings'][i].format,format)){ 
                        return mapping['mappings'][i];
                    }
                }

                //add if not found
                var newMapping = {array: array,label:[],format:format};
                mapping['mappings'].push(newMapping);
                return newMapping;
        }
        
        /**
         * split mapping path to generate a format object (ignore "root" and "" values)
         * @param  {String} mapping           the mapping path to parse
         * @param  {bool} collectionMapping   is it a collection ?
         * 
         * @return {object} format            the generated format
         */
        function extractMappingFormat(mapping,collectionMapping){
            var format = [];
            var splittedEntityMapping = mapping.split(self.nodePath.separator);
            if(mapping.charAt(0)=="/")splittedEntityMapping.splice(0,1);
            for(var i in splittedEntityMapping)
            {
                var curEntMapping = splittedEntityMapping[i];
                if(curEntMapping=="root" || curEntMapping=="")continue;//don't add rootNode
                if(curEntMapping=="text"){
                    format.push({
                        fn : "text"
                    })
                }else if(curEntMapping.charAt(0) == "@"){
                    var label = curEntMapping 
                    format.push({
                        fn : "attr",
                        arg : [label.substring(1)]
                    })
                }else {
                    var label = curEntMapping
                    format.push({
                        fn : "children",
                        arg : [label]
                    })
                } 
            }
            return format;
        }

        /**
         * loop recursively over parents to find the closest collection node 
         * @param  {String}  nodePath                   node path
         * @param  {boolean} exlude                     exclude nodePath if it's a collectionNodePath
         * @return {String}  collectionNodePath         the closest parent collection node path
         */
        function getClosestCollectionPath(nodePath,exclude){
            if(knownCollection[nodePath] && !exclude)
                return nodePath;
            var $node = knownNodes[nodePath].div;
            if($node){
                var found = false;
                while(true){
                    var parent = $node.parent();
                    if(parent.length==0){
                        return self.nodePath.root; //stop loop if no more parent
                    }else{
                        var parentPath = parent.data("node-path");
                        if(parentPath && knownCollection[parentPath])
                            return parentPath;
                        $node = parent;
                        nodePath = parentPath || nodePath;
                    }

                }
            } 
        }

        function isSameFormat(f1,f2){
            for(var i in f1){
                if(!f2[i] || f1[i].nodeUtils != f2[i].nodeUtils)return false;
                for (var j in f1[i].arg){
                    if(!f2[i].arg[j] || f1[i].arg[j] != f2[i].arg[j])return false;
                }
            }
            return true;
        }
    }
}