Ext.define('App.view.recommandation.Browse', {
    extend: 'App.view.widgets.Browse',

    fields: {
        id: {
            property: 'id'
        },

        destination: {
            property: 'destination'
        },

        importance: {
            property: 'importance'
        },

        urgency: {
            property: 'urgency'
        }
    },

    controller: 'recommandationbrowse',
    viewModel: {
        type: 'recommandationbrowse'
    },

    cls: 'recommandationbrowse',
    bind: {
        store: '{recommandations}'
    }
});
