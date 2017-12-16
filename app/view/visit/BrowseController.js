Ext.define('App.view.visit.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.visitbrowse',

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
    },

    onCreate: function() {
        this.redirectTo('visit/create');
    },

    summarizeNb: function (grid, context) {
        return context.records.length + ' Projets';
    }
});
