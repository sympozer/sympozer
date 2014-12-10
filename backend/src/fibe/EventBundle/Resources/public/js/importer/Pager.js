var Pager = {

	
	initialize : function(page){
		this.currentPage = $(page);

        this.desc = $("#desc-header"); 
        this.progress = $("#progress-header");
	},

	changePage : function(page){

		this.currentPage.hide("slow");
		this.currentPage = $(page);
        this.currentPage.show("slow");
        // update header desc and progress
        this.desc.html(this.currentPage.data("desc"));
        this.progress.find(".progress-bar").width(this.currentPage.data("progress")+"%");
	},
    getPage : function(){
        return this.currentPage;
    },

    getPanelHtml : function(content,op){
        if(!op)op={}; 
        return  $('<div class="panel '+
                    (op.panelClass || "panel-default")+'"'+
                    (op["model-path"]?' data-model-path="'+op["model-path"]+'"':"")+
                    (op["node-path"]?' data-node-path="'+op["node-path"]+'"':"")+
                    (op.margin===true?' style="margin:15px;"':'')+
                    (op.collapsible===true?' ':'')+
                    '>'+ 
                  '<!-- Default panel contents -->'+
                  '<div class="panel-heading" '+
                  (op.collapsible===true?
                        (op.collapsed===true?'data-collapsed="true"':'data-collapsed="false"')
                        +'style="cursor: pointer;" onclick="(!$(this).data(\'collapsed\') ? $(this).find(\'> .panel-title i\').removeClass(\'fa-chevron-down\').addClass(\'fa-chevron-up\').parent().parent().siblings(\'ul\').hide(\'slow\')\
                                                                  : $(this).find(\'> .panel-title i\').removeClass(\'fa-chevron-up\').addClass(\'fa-chevron-down\').parent().parent().siblings(\'ul\').show(\'slow\'));$(this).data(\'collapsed\',!$(this).data(\'collapsed\'));"':'')+
                  
                  '> <h3 class="panel-title">'+
                        content+
                        (op.collapsible===true?' <i class="fa '+(op.collapsed===true?'fa-chevron-up':'fa-chevron-down')+'"/> ':'')+
                    '</h3></div>'+
                  '<ul class="'+(op.padding===true?"panel-body ":"")+'list-group" '+(op.collapsed===true?'style="display:none;"':'')+'>');
    },


    addClickablePopover : function($div,htmlContent){
        //popover qui reste tant que le curseur ne quitte pas la zone bouton+popover (par defaut => disparait quand entre dans le popover...)
        return $div.popover({
            trigger: 'manual', 
            placement:"right",
            html:"true",
            title:"<i class='fa fa-cog'></i> file reader options",
            content:"<p class='preview-popover-content'>The preview may not be up to date because it isn't saved.</p>",
            template: '<div style="color:#333;" class="popover" onmouseover="clearTimeout(timeoutObj);$(this).mouseleave(function() {$(this).hide();});"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
            }).mouseenter(function(e) {
                $(this).popover('show');
                $div.siblings(".popover").find(".preview-popover-content").html(htmlContent);
            }).mouseleave(function(e) {
                var ref = $(this);
                timeoutObj = setTimeout(function(){
                    ref.popover('hide');
                }, 50);
            });
    }

}