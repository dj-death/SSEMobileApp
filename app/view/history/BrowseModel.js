Ext.define('App.view.history.BrowserModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.historybrowse',

    stores: {
        history: {
            type: 'actions',

            remoteGroup: false,

            pageSize: 25, // even if 0 is necessary to allow exporting all data to excel
            clearOnPageLoad: false, // scolling add projet page that will not be cleared

            listeners: {
                refresh: 'onStoreRefresh',
                buffer: 100
            },

            grouper: {
                groupFn: function(record) {
                    var date = Ext.Date.clearTime(new Date(record.get('created'))),
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

        recipients: {
            type: 'filters',
            service: 'people',
            field: 'person.id',
            label: 'lastname'
        },

        types: {
            type: 'filters',
            service: 'actions',
            field: 'action.type',
            label: 'action.type'
        }
    }
});
