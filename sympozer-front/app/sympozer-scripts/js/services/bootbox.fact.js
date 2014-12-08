/**
 * bootbox service
 * Workaround to make bootboxJS (modal and popup plugin) compatible with angular UI
 * @type {factory}
 */
angular.module('sympozerApp').factory('$bootbox', ['$modal', function ($modal)
{
    // NOTE: this is a workaround to make BootboxJS somewhat compatible with
    // Angular UI Bootstrap in the absence of regular bootstrap.js
    if ($.fn.modal == undefined)
    {
        $.fn.modal = function (directive)
        {
            var that = this;
            if (directive == 'hide')
            {
                if (this.data('bs.modal'))
                {
                    this.data('bs.modal').close();
                    $(that).remove();
                }
                return;
            }
            else if (directive == 'show')
            {
                return;
            }

            var modalInstance = $modal.open({
                template: $(this).find('.modal-content').html()
            });
            this.data('bs.modal', modalInstance);
            setTimeout(function ()
            {
                $('.modal.ng-isolate-scope').remove();
                $(that).css({
                    opacity: 1,
                    display: 'block'
                }).addClass('in');
            }, 100);
        };
    }

    return bootbox;
}])