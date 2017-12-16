Ext.define('App.view.partner.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.partnerbrowse',

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
    },

    onCreate: function() {
        this.redirectTo('partner/create');
    }

});
