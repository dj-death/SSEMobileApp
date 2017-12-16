Ext.define('App.view.partner.ShowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.partnershow',

    stores: {
        reports: {},

        products: {
            type: 'products',
            sorters: 'name',
            autoLoad: true,

            pageSize: 0,

            grouper: {
                groupFn: function(record) {
                    return record.get('name')[0];
                }
            }
        },

        projects: {
            type: 'projects',

            pageSize: 0,

            remoteGroup: false,
            sorters: 'annee',

            grouper: {
                groupFn: function(record) {
                    return record.get('annee');
                }
            }
        },

        members: {
            type: 'members',
            pageSize: 0,
            autoLoad: true
        },

        finances: {
            type: 'finances',

            pageSize: 0,
            
            sorters: 'exercice',
            autoLoad: true
        },

        history: {
            type: 'actions',
            pageSize: 12
        }
    }
});
