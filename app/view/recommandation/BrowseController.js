Ext.define('App.view.recommandation.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.recommandationbrowse',

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
    }

});
