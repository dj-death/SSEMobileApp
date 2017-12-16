Ext.define('App.view.recommandation.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.recommandationbrowse',

    stores: {
        recommandations: {
            type: 'recommandations',
            remoteGroup: false,
            remoteSort: true,

            pageSize: 25, // even if 0 is necessary to allow exporting all data to excel
            clearOnPageLoad: false, // scolling add projet page that will not be cleared

            listeners: {
                refresh: 'onStoreRefresh',
                buffer: 100
            }

        }
    }
});
