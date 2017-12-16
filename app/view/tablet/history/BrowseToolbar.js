Ext.define('App.view.tablet.history.BrowseToolbar', {
    extend: 'App.view.widgets.BrowseToolbar',
    // xtype: 'historybrowsetoolbar', -- set by profile

    items: {
        employees: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'label',
            placeholder: 'Tous les employées',
            queryMode: 'local',
            weight: 10,
            bind: {
                selection: '{filters.recipient}',
                store: '{recipients}'
            }
        },
        actions: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'label',
            placeholder: 'Toutes les actions',
            queryMode: 'local',
            weight: 13,
            bind: {
                selection: '{filters.type}',
                store: '{types}'
            }
        }
    }
});
