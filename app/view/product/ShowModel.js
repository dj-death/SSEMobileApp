Ext.define('App.view.product.ShowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.productshow',

    data: {
        riskscount: null,
        partner: null,
        imagecount: null
    },

    stores: {
        markers: {},

        images: {
            fields: ['id', 'src', 'title'],
            data: []
        },

        productRisks: {
            fields: ['id', 'name', 'url'],
            data: []
        },

        projects: {
            type: 'projects',
            pageSize: 0,

            filters: [],

            sorters: 'annee',
            remoteGroup: false,
            grouper: {
                groupFn: function(record) {
                    return record.get('annee');
                }
            }
        },

        partners: {
            type: 'partners',
            grouper: {
                groupFn: function(record) {
                    return record.get('name')[0];
                }
            }
        },

        visits: {
            type: 'visits',
            pageSize: 12,
            autoLoad: true,
            grouper: {
                groupFn: function(record) {
                    var date = Ext.Date.clearTime(new Date(record.get('startDate'))),
                        today = Ext.Date.clearTime(new Date());

                    if (Ext.Date.isEqual(date, today)) {
                        return 'Aujourd\'hui';
                    } else if (Ext.Date.isEqual(date, Ext.Date.subtract(today, Ext.Date.DAY, 1))) {
                        return 'Hier'
                    } else {
                        return 'Exercice ' + Ext.Date.format(date, 'Y');
                    }
                }
            }
        },

        history: {
            type: 'actions',
            pageSize: 12
        }
    }
});
