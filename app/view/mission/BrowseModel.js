Ext.define('App.view.mission.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.missionbrowse',

    stores: {
        missions: {
            type: 'missions',

            pageSize: 25, // even if 0 is necessary to allow exporting all data to excel
            clearOnPageLoad: false, // scolling add projet page that will not be cleared

            listeners: {
                refresh: 'onStoreRefresh',
                buffer: 100
            },

            
            grouper: {
                groupFn: function(record) {
                    return record.get('name')[0];
                }
            }
        }
    }
});
