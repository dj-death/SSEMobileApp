Ext.define('App.view.mission.ShowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.missionshow',

    data: {
        user: null,         // { name, icon }
        calendars: null
    },

    stores: {
        products: {
            type: 'filters',
            service: 'products',
            field: 'product.id',
            label: 'product.name'
        },

        assignees: {
            type: 'filters',
            service: 'people',
            field: 'person.id',
            label: 'lastname'
        },

        visits: {
            type: 'visits',
            listeners: {
                refresh: 'onStoreRefresh',
                buffer: 100
            },

            pageSize: 0
        }
    }
});
