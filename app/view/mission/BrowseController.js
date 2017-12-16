Ext.define('App.view.mission.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.missionbrowse',

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
    },

    onCreate: function() {
        this.redirectTo('mission/create');
    }
});
