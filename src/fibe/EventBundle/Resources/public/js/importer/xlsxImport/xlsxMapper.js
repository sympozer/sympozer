xlsxMapper = {

	readFile : function(file,reader){ 

        reader.onload = function(e) { 
            var data = e.target.result
            if(typeof Worker !== 'undefined') { 
               xlsxMapper.xlsxworker(data,process_wb);
            } else {
                    //var wb = XLSX.read(data, {type: 'binary'});
                    var arr = String.fromCharCode.apply(null, new Uint8Array(data));
                    var wb = XLSX.read(btoa(arr), {type: 'base64'});
                    process_wb(wb);
            }

            function process_wb(wb) {
                var data = "";
                var type = "json";

                switch(type) {
                        case "json":
                            data = xlsxMapper.to_json(wb);
                                break;
                        case "form":
                            data = to_formulae(wb);
                            break; 
                        default:
                            data = to_csv(wb); 
                }
                $(xlsxMapper).trigger("fileRead",[data ]); 
            } 
        }
        reader.readAsArrayBuffer(file);
    }, 
 
    defaultMapping : {
        util : "xlsUtil",
        getNodeKey : {
            format : [{
                fn : "generate"
            }] 
        }, 
        getNodeName : {
            format : [{
                fn : "index"
            }] 
        }
    },

    map : function(data,basePath,nodeCallBack,entryCallBack){ 
        
        
        for(var sheetName in data){
            var sheet = data[sheetName];
            var nodePath = basePath+mapper.nodePath.separator+sheetName;
            nodeCallBack(nodePath,{panelClass:"panel-success",margin:true,collapsible:true,collapsed:false});
            
            for(var i = 0; i < sheet.length; i++){
                var currentLine = sheet[i];
                nodeCallBack(nodePath,{panelClass:"panel-success",margin:true,collapsible:true,collapsed:false},true);

                for(var tab in currentLine){

                    if(tab != "__rowNum__"){ 
                        var childNodePath = nodePath+mapper.nodePath.separator +tab; 
                         nodeCallBack(childNodePath,{panelClass:"panel-success",margin:true,collapsible:true,collapsed:false},true);
                        entryCallBack(childNodePath+mapper.nodePath.separator+mapper.nodePath.text, currentLine[tab]);
                    }
                }
            }
        }
        $(xlsxMapper).trigger("mapEnd");   
    }, 

    // *required by Importer internal*  
    getNodeName : function(node,index){  
        if(!index) console.log("undefined nodename for",node)
        return index;
    },

    // *required by Importer internal* 
    getNbRootChildren : function(node){  
                return node.length;
    },

    utils : {
        // get specific children in a nodeSet ( case sensitive )
        //arg[0] string : contains the seeked children nodeName. if undefined returns all
        //arg[1] bool   : option to match with substring containment
        //arg[2] bool   : is root node
        children : function(node,arg){
            var rtnNodeSet1= [],
                rtnNodeSet2= {},
                seekAllChar = '*',
                seekedChildNodeName =   arg && arg[0] ? arg[0] : seekAllChar  
            var matchTest = seekedChildNodeName==seekAllChar
                            ? function(){ return true} 
                            : arg && arg[1] === true
                                ? function(a,b){ return a.indexOf(b) > -1}
                                : function(a,b){ return a === b};

            for (var i in node){
                if( matchTest(i,seekedChildNodeName)){
                    if(typeof node[i] == 'string' || node[i] instanceof String )
                        rtnNodeSet2[i] = node[i];
                    else{
                        for (var j in node[i]){
                            if(j!="__rowNum__"){ 
                                rtnNodeSet1.push(node[i][j]);
                            }
                        }   
                    }
                }
                // else{
                //     if(i!="__rowNum__" &&  matchTest(i,seekedChildNodeName) ){ 
                //         rtnNodeSet2[i] = node[i];
                //     }

                //     // for (var j in node[i]){
                //     //     if(j!="__rowNum__" &&  matchTest(j,seekedChildNodeName) ){ 
                //     //         rtnNodeSet2.push(node[i][j]);
                //     //     }
                //     // }   
                // }
                // if(node && (seekedChildNodeName==seekAllChar || matchTest(node,seekedChildNodeName))){ 
                //     rtnNodeSet.push(node[i]);
                // }
            }   
            return rtnNodeSet1.length > 0 ? rtnNodeSet1 : rtnNodeSet2;
        },
        index : function(node){
            return node["nodeName"];
        },
        text : function(node){  
                if(typeof node == 'string' || node instanceof String )
                     return node
                else 
                    for (var i in node)return node[i];
        },
        //get a random key because we don't care about fk
        generate : function(node){
            return Math.floor((Math.random()*1024*1024*1024*1024));
        }
    },





    setWorker : function (worker){ 
        xlsxMapper.worker     = worker;
    },

    xlsxworker : function(data, cb) {
          
            xlsxMapper.worker.onmessage = function(e) {
                    switch(e.data.t) {
                            case 'ready': break;
                            case 'e': console.error(e.data.d); break;
                            case 'xlsx': cb(JSON.parse(e.data.d)); break;
                    }
            };
            var arr = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
            xlsxMapper.worker.postMessage(arr);
    },

    to_json : function (workbook) {
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
                    var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    if(roa.length > 0){
                            result[sheetName] = roa;
                    }
            });
            return result;
    },

    to_csv : function (workbook) {
            var result = [];
            workbook.SheetNames.forEach(function(sheetName) {
                    var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
                    if(csv.length > 0){
                            result.push("SHEET: " + sheetName);
                            result.push("");
                            result.push(csv);
                    }
            });
            return result.join("\n");
    },

   to_formulae : function (workbook) {
            var result = [];
            workbook.SheetNames.forEach(function(sheetName) {
                    var formulae = XLSX.utils.get_formulae(workbook.Sheets[sheetName]);
                    if(formulae.length > 0){
                            result.push("SHEET: " + sheetName);
                            result.push("");
                            result.push(formulae.join("\n"));
                    }
            });
            return result.join("\n");
    }
}