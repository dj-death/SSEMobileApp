Ext.define('App.view.partner.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.partnerbrowse',

    stores: {
        partners: {
            type: 'partners',
            remoteGroup: false,
            remoteSort: true,
                        
            sorters: 'statut_juridique',

            pageSize: 25, // even if 0 is necessary to allow exporting all data to excel
            clearOnPageLoad: false, // scolling add projet page that will not be cleared

            listeners: {
                refresh: 'onStoreRefresh',
                buffer: 100
            },

            grouper: {
                groupFn: function(record) {
                    return record.get('statut_juridique');
                }
            }
        },

        communes: {
            type: 'communes',
            autoLoad: true
        },
        
        domaines: {
            type: 'domaines',
            autoLoad: true
        },

        statuts: {
            type: 'statutsjuridiques',
            autoLoad: true
        }
    }
});
