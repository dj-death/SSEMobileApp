Ext.define('App.view.visit.Browse', {
    extend: 'App.view.widgets.Browse',

    fields: {
        id: {
            property: 'id'
        },

        mission: {
            property: 'mission_id'
        },

        assignee: {
            property: 'assignee_id'
        },

        product: {
            property: 'product_id'
        },

        quartier_douar: {
            property: 'quartier_douar'
        }
    },

    controller: 'visitbrowse',
    viewModel: {
        type: 'visitbrowse'
    },

    cls: 'visitbrowse',
    bind: {
        store: '{visits}'
    }
});
