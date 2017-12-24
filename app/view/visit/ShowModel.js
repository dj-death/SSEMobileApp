Ext.define('App.view.visit.ShowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.visitshow',

    data: {
        riskscount: null
    },

    stores: {
        history: {
            type: 'actions',
            pageSize: 12
        },

        /*risks: {
            fields: ['id', 'name', 'url'],
            data: []
        },*/

        /*products: {
            type: 'products',
            pageSize: 0,
            autoLoad: true,

            listeners: {
                refresh: 'onProductsRefresh',                
                buffer: 100
            }
        },

        recommandations: {
            type: 'recommandations',
            pageSize: 25,

            autoLoad: true,
            grouper: {
                groupFn: function(record) {
                    return record.get('urgency');
                }
            }
        }*/
    }
});
