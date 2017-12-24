Ext.define('App.view.visit.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.visitbrowse',

    stores: {
        visits: {
            type: 'visits',
            remoteGroup: false,
            remoteSort: true,

            pageSize: 10, // even if 0 is necessary to allow exporting all data to excel
            clearOnPageLoad: false, // scolling add projet page that will not be cleared

            listeners: {
                refresh: 'onStoreRefresh',
                filterchange: 'onStoreFiltered',
                buffer: 100
            },


            grouper: {
                groupFn: function(record) {
                    var date = Ext.Date.clearTime(new Date(record.get('startDate'))),
                        today = Ext.Date.clearTime(new Date());

                    if (Ext.Date.isEqual(date, today)) {
                        return 'Aujourd\'hui';
                    } else if (Ext.Date.isEqual(date, Ext.Date.subtract(today, Ext.Date.DAY, 1))) {
                        return 'Hier'
                    } else {
                        return Ext.Date.format(date, 'd F Y');
                    }
                }
            }
        },

        employees: {
            type: 'filters',
            service: 'people',
            field: 'person.id',
            label: 'lastname'
        },

        missions: {
            type: 'filters',
            service: 'missions',
            field: 'mission.id',
            label: 'mission.name'
        },

        products: {
            type: 'filters',
            service: 'products',
            field: 'product.id',
            label: 'product.name'
        }

    }
});
