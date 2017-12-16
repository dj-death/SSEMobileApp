Ext.define('App.view.person.Browse', {
    extend: 'App.view.widgets.Browse',



    controller: 'personbrowse',
    viewModel: {
        type: 'personbrowse'
    },

    cls: 'personbrowse',
    bind: {
        store: '{people}'
    }
});
