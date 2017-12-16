Ext.define('App.view.product.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.productbrowse',

    stores: {
        products: {
            type: 'products',
            remoteGroup: false,
            autoLoad: true,

            pageSize: 25, // even if 0 is necessary to allow exporting all data to excel
            clearOnPageLoad: false, // scolling add projet page that will not be cleared

            grouper: {
                groupFn: function(record) {
                    return record.get('commune');
                }
            },

            listeners: {
                refresh: 'onStoreRefresh',
                buffer: 100
            }
        },

        exercices: {
            type: 'annees',
            autoLoad: true
        },

        communes: {
            type: 'communes',
            autoLoad: true
        },


        quartiers: {
            type: 'quartiers',
            autoLoad: true
        },


        secteurs: {
            type: 'secteurs',
            autoLoad: true
        },

        soussecteurs: {
            type: 'soussecteurs',
            autoLoad: true
        }
    }
});
