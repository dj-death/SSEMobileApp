Ext.define('App.view.person.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.personbrowse',

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
    },

    onCreate: function() {
        this.redirectTo('person/create');
    }
});
