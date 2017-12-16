Ext.define('App.view.tablet.visit.BrowseController', {
    extend: 'App.view.visit.BrowseController',
    alias: 'controller.tablet-visitbrowse',

    /*onCreate: function() {
        // The creation form can be accessed either by clicking the "create" button (dialog)
        // or via the #visit/create url (page) - default config matches the "page"
        // view. Note that this dialog will be destroyed on close.
        var newRecord = Ext.create('App.model.Visit');

        Ext.create({
            xtype: 'visitcreate',
            record: newRecord,
            centered: true,
            floated: true,
            modal: true,
            ui: 'dialog',
            toolbar: {
                docked: 'bottom'
            }

        }).show();
    }*/

});
