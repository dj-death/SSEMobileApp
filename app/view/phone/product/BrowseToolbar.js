Ext.define('App.view.phone.product.BrowseToolbar', {
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
                placeholder: 'Commune',
                queryMode: 'local',
                bind: {
                    selection: '{filters.commune}',
                    store: '{communes}'
                },

                flex: 1,
                margin: '6 4'
            }, {
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Quartier',
                queryMode: 'local',
                bind: {
                    selection: '{filters.quartier}',
                    store: '{quartiers}'
                },

                flex: 1,
                margin: '6 4'
            }]
        },

        types3: {
            xtype: 'container',
            weight: 12,
           
            layout: 'hbox',
           
            items: [{
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Secteur',
                queryMode: 'local',
                bind: {
                    selection: '{filters.secteur}',
                    store: '{secteurs}'
                },

                flex: 1,
                margin: '6 4'
            }, {
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Sous-secteur',
                queryMode: 'local',
                bind: {
                    selection: '{filters.soussecteur}',
                    store: '{soussecteurs}'
                },

                flex: 1,
                margin: '6 4'
            }]
        },


        type: {
            xtype: 'selectfield',
            placeholder: 'Tout Type',
            weight: 15,

            options: [{
                text: 'AGR',
                value: 'AGR'
            }, {
                text: 'EPS / Centre d\'accueil',
                value: 'EPS'
            }, {
                text: 'Centre (CSE, Maisons des jeunes, Foyers,.etc)',
                value: 'Centre'
            }, {
                text: 'Moyens de transports',
                value: 'Transport'
            }, {
                text: 'Service public social',
                value: 'Service public social'
            }, {
                text: 'Infrastructure / Espace aménagé',
                value: 'Infrastructure'
            }, {
                text: 'Espace de sport',
                value: 'Espace de sport'
            }, {
                text: 'Autre',
                value: 'Autre'
            }],

            bind: {
                selection: '{filters.type}',
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
