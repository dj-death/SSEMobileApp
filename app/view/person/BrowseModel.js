Ext.define('App.view.person.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.personbrowse',

    stores: {
        people: {
            type: 'people',
            grouper: {
                groupFn: function(record) {
                    return record.get('lastname')[0];
                }
            }
        }
    }
});
