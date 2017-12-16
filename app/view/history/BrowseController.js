Ext.define('App.view.history.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.historybrowse',

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
        
        vm.getStore('history').reload();
    },

    onDeleteAction: function(list, data) {
        var store = this.getViewModel().getStore('history');
        store.remove(data.record);
        store.save();
    }
});
