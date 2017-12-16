Ext.define('App.view.tablet.person.BrowseToolbar', {
    extend: 'App.view.widgets.BrowseToolbar',
    // xtype: 'personbrowsetoolbar', -- set by profile

    items: {
        create: {
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            handler: 'onCreate',
            text: 'Ajouter Utilisateur',
            weight: 50
        }
    }
});
