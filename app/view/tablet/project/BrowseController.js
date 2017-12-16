Ext.define('App.view.tablet.project.BrowseController', {
    extend: 'App.view.project.BrowseController',
    alias: 'controller.tablet-projectbrowse',

    /*onCreate: function() {
        // The creation form can be accessed either by clicking the "create" button (dialog)
        // or via the #product/create url (page) - default config matches the "page"
        // view. Note that this dialog will be destroyed on close.
        var record = Ext.create('App.model.Project');

        Ext.create({
            xtype: 'projectcreate',
            record: record,
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
