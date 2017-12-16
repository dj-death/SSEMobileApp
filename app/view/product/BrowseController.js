Ext.define('App.view.product.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.productbrowse',

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
    }
});
