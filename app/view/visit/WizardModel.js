Ext.define('App.view.visit.WizardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.visitwizard',

    data: {
        record: null,
        risksload: false
    },
    
    stores: {
        missions: {
            type: 'filters',
            service: 'missions',
            field: 'mission.id',
            label: 'mission.name',

            sorters: [{
                property: 'createdAt',
                direction: 'DESC'
            }]
        },

        assignees: {
            type: 'filters',
            service: 'people',
            field: 'person.id',
            label: 'lastname'
        },

        /*products: {
            type: 'filters',
            service: 'products',
            field: 'product.id',
            label: 'product.name'
        },*/

        products: {
            type: 'products',
            autoLoad: true,
            pageSize: 0
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
        },

        visitRisks: {
            fields: ['id', 'name', 'url'],
            pageSize: 0,
            data: []
        },


        riskstree: {
            type: 'risques',
            autoLoad: true,

            listeners: {
                load: 'onRisksLoad'
            }
        },

        etats: {
            type: 'etats',
            autoLoad: true
        },

        objetsetats: {
            type: 'objetsetats',
            autoLoad: true
        },

        qualites: {
            type: 'qualites',
            autoLoad: true
        },

        degrees: {
            type: 'degrees',
            autoLoad: true
        },

        usages: {
            type: 'usages',
            autoLoad: true
        },

        satisfactions: {
            type: 'satisfactions',
            autoLoad: true
        },

        suffisances: {
            type: 'suffisances',
            autoLoad: true
        }
    }
});
