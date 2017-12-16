Ext.define('App.view.phone.partner.BrowseToolbar', {
    extend: 'Ext.Toolbar',
    // xtype: 'projectbrowsetoolbar', -- set by profile

    cls: 'browse-toolbar',
    weighted: true,
    ui: 'tools',

    defaults: {
        ui: 'action',
    },

    layout: 'vbox',

    scrollable: {
        y: 'scroll'
    },

    hidden: true,

    items: {

        search_panel: {
            xtype: 'container',
            weight: 0,
            layout: 'hbox',

            items: [{
                xtype: 'button',
                ui: 'action-remove round',
                enableToggle: true,
                iconCls: 'x-fa fa-microphone',
                handler: 'onSpeech',
                text: '',
                width: 50,
                maxWidth: 50,
                margin: '6 4'
            }, {
                xtype: 'searchfield',
                reference: 'search',
                clearable: true,
                placeholder: 'Rechercher',
                userCls: 'expandable',
                bind: '{filters.search}',

                flex: 1,
                margin: '6 4'
            }]

        },


        localisation: {
            xtype: 'container',
            weight: 11,
            layout: 'hbox',

            items: [{
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Tout Statut',
                queryMode: 'local',
                flex: 1,
                margin: '6 4',
                bind: {
                    selection: '{filters.statut_juridique}',
                    store: '{statuts}'
                }
            }, {
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Tout Domaine',
                queryMode: 'local',
                flex: 1,
                margin: '6 4',
                bind: {
                    selection: '{filters.domaine}',
                    store: '{domaines}'
                }
            }]

        },

        statut: {
            xtype: 'combobox',
            weight: 15,
            valueField: 'value',
            displayField: 'value',
            placeholder: 'Commune',
            queryMode: 'local',
            bind: {
                selection: '{filters.commune}',
                store: '{communes}'
            }
        },
        
        actions: {
            xtype: 'container',
            weight: 20,
            layout: 'hbox',

            items: [{
                xtype: 'button',
                ui: 'action',
                handler: 'onToggleGroupTap',
                tooltip: 'Grouper',
                bind: {
                    iconCls: '{toogleGroupIconCls}'
                },

                flex: 1,
                margin: '6 4'
            }, {
                xtype: 'button',
                ui: 'action',
                iconCls: 'x-fa fa-refresh',
                handler: 'onRefreshTap',
                tooltip: 'Actualiser',

                flex: 1,
                margin: '6 4'
            }, {
                xtype: 'button',
                ui: 'action',
                iconCls: 'x-fa fa-filter',
                handler: 'onClearFiltersTap',
                tooltip: 'Annuler Filtres',

                flex: 1,
                margin: '6 4'
            }]

        }
    }
});
