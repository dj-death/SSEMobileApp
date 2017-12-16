Ext.define('App.view.widgets.BrowseToolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'personbrowsetoolbar',

    cls: 'browse-toolbar no-print',
    weighted: true,
    ui: 'tools',

    defaults: {
        ui: 'action',
    },

    items: {
        speech: {
            xtype: 'button',
            ui: 'action-remove round',
            enableToggle: true,
            iconCls: 'x-fa fa-microphone',
            handler: 'onSpeech',
            text: '',
            weight: 0
        },

        search: {
            xtype: 'searchfield',
            reference: 'search',
            clearable: true,
            placeholder: 'Rechercher',
            userCls: 'expandable',
            bind: '{filters.search}',
            weight: 1
        },

        toggleGrouping: {
            handler: 'onToggleGroupTap',
            tooltip: 'Grouper',
            bind: {
                iconCls: '{toogleGroupIconCls}'
            },
            weight: 30
        },
        
        refresh: {
            iconCls: 'x-fa fa-refresh',
            handler: 'onRefreshTap',
            tooltip: 'Actualiser',
            weight: 40
        },
        clear: {
            iconCls: 'x-fa fa-filter',
            handler: 'onClearFiltersTap',
            tooltip: 'Annuler Filtres',
            weight: 20
        }
    }
});
