// prevent misdrop
$(document).bind('drop dragover', function (e) {
    e.preventDefault();
}); 
$(document).ready( function () {
    $("input[type='file']").each(function(){
        fileDropper(this)
    })
});    
function fileDropper(input,dataFileChangeCallBck){
    var $input = $(input);
    if($input.closest(".droppable-area").length>0){
        var $fileAreaDiv = $input.closest(".droppable-area");
        $fileAreaDiv.off('drop').on('drop',{$fileAreaDiv:$fileAreaDiv},handleDataFileChange);  
        $input.off('change').on('change', {$fileAreaDiv:$fileAreaDiv},handleDataFileChange);
        return;
    }else{}
    var $fileAreaDiv    = $("<div class='droppable-area'>");
    $fileAreaDiv.insertBefore($input)
        .append('<span>Drag your file here <br/> or </span>')
        .append($input)
        .append('<small class="filename fa fa-file-o"> </small>');
     
    $fileAreaDiv.on('dragenter',{$fileAreaDiv:$fileAreaDiv},handleDragover); 
    $fileAreaDiv.on('dragover',{$fileAreaDiv:$fileAreaDiv},handleDragover); 
    $fileAreaDiv.on('dragleave',{$fileAreaDiv:$fileAreaDiv},handleDragleave);
    $fileAreaDiv.on('drop',{$fileAreaDiv:$fileAreaDiv},handleDataFileChange); 

    $input.on('change', {$fileAreaDiv:$fileAreaDiv},handleDataFileChange);

    $input.bootstrapFileInput(); 
    $fileAreaDiv.css({
        "border"    :"4px dashed #bbb",
        "padding"   :"15px 25px",
        "text-align":"center",
        "font"      :"20pt bold,'Vollkorn'",
        "color"     :"#bbb"
    }).find("span").css({
        "display": "block"
    });

    $fileAreaDiv.find(".filename").css({ 
        "color"     : "rgb(158, 158, 158)",
        "font-size" : "16px",
        "display": "block",
        "margin-top": "1em"
    });
    function handleDragover(e) {
            e.stopPropagation();
            e.preventDefault(); 
            e.data.$fileAreaDiv.css("border-color","green")
                       .find("> span").css({"color":"#444"});
    }

    function handleDragleave(e) {
            e.stopPropagation();
            e.preventDefault();
            e.data.$fileAreaDiv.css("border-color","#bbb")
                       .find("> span").css({"color":"#bbb"});
    }


     function handleDataFileChange(e) {

            e.stopPropagation();
            e.preventDefault(); 
            e.data.$fileAreaDiv.css("border-color","green")
                       .find("> span").css({"color":"#444"});

            var file="",files; 
                files = e.dataTransfer || e.originalEvent.dataTransfer || e.target;
            file = files.files[0];
            e.data.$fileAreaDiv.find(".filename").text(" : "+file.name)
            if(dataFileChangeCallBck)dataFileChangeCallBck(file); 
    }
}
            