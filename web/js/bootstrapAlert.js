var bootstrapAlertTimeout;
function bootstrapAlert(type,msg,title,icon){
    var displayDuration = 5000;
    var fadeInDuration = 'fast';
    var fadeOutDuration = 1500;
    setTimeout(function(){

        var $body = $("body");

        //get unique #bootstrap_alert
        var $bootstrapAlert = $('#bootstrap_alert').length < 1 ? $('<div id="bootstrap_alert"></div>').prependTo($body) : $('#bootstrap_alert');
        
        if(type== "stop"){
          clearTimeout(bootstrapAlertTimeout); 
          // $bootstrapAlert.animate({'opacity': 0 }, {queue: false, duration: 1500});
          $bootstrapAlert.stop().fadeOut(fadeOutDuration)
                         
          return;
        } 
        var config = {
            success:{
                title:"Success : ",
                icon:"<i class='fa fa-check'></i>"
            },
            info:{
                title:"Info : ",
                icon:"<i class='fa fa-info'></i>"
            },
            warning:{
                title:"Warning : ",
                icon:"<i class='fa fa-meh-o'></i>"
            },
            error:{
                title:"Error : ",
                icon:"<i class='fa fa-meh-o'></i>"
            }
        }
        //default values
        if(!config[type]){
            msg=type;
            type="info";
        }
        if(!icon && icon!=""){ 
            icon = config[type].icon
        } 

        if(!title && title!="" ){
            title = config[type].title;
        }

        $bootstrapAlert.attr("class","")
                       .addClass("alert alert-"+type) 
                       .html('<button type="button" class="close" data-dismiss="alert">&times;</button><strong> '+title+' </strong>')
                       .append($('<div/>').html(msg).text())  
                       .prepend($(icon).addClass("fa-2x").css("margin-right","0.5em"));

        $bootstrapAlert.stop().hide().fadeIn(fadeInDuration);
        clearTimeout(bootstrapAlertTimeout);
        bootstrapAlertTimeout=setTimeout(function(){
            $bootstrapAlert.fadeOut(fadeOutDuration);
        },displayDuration);
    }, 1);
}