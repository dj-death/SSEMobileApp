Ext.define('App.view.phone.project.BrowseToolbar', {
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
                margin: '2 4'
            }, {
                xtype: 'searchfield',
                reference: 'search',
                clearable: true,
                placeholder: 'Rechercher',
                userCls: 'expandable',
                bind: '{filters.search}',

                flex: 1,
                margin: '2 4'
            }]

        },

        general: {
            xtype: 'container',
            weight: 10,
            layout: 'hbox',

            items: [
            {
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Année',
                queryMode: 'local',
                bind: {
                    selection: '{filters.annee}',
                    store: '{annees}'
                },

                flex: 1,
                margin: '2 4'
            }, {
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Programme',
                queryMode: 'local',
                bind: {
                    selection: '{filters.programme}',
                    store: '{programmes}'
                },

                flex: 1,
                margin: '2 4'
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
                margin: '2 4'
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
                margin: '2 4'
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
                margin: '2 4'
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
                margin: '2 4'
            }]
        },

        types: {
            xtype: 'container',
            weight: 13,
            layout: 'hbox',
        
            items: [{
                xtype: 'selectfield',
                placeholder: 'Projet/Action',
                options: [{
                    text: 'Projets',
                    value: true
                }, {
                    text: 'Actions',
                    value: false
                }],

                bind: {
                    selection: '{filters.est_projet}'
                },

                flex: 1,
                margin: '2 4'
            }, {
                xtype: 'selectfield',
                placeholder: 'AGR & Autres',
                options: [{
                    text: 'AGR',
                    value: true
                }, {
                    text: 'Non AGR',
                    value: false
                }],

                bind: {
                    selection: '{filters.est_AGR}'
                },

                flex: 1,
                margin: '2 4'
            }]
        },

        statut: {
            xtype: 'combobox',
            weight: 15,
            valueField: 'value',
            displayField: 'value',
            placeholder: 'Statut',
            queryMode: 'local',
            bind: {
                selection: '{filters.statut}',
                store: '{statuts}'
            }
        },


        inclusion: {
            xtype: 'container',
            weight: 16,
           
            autoSize: true,

            layout: 'hbox',

            items: [{
                xtype: 'checkbox',
                boxLabel: 'Inclure Sous-Projets',
                flex: 1,
                margin: '2 4',
                checked: false,

                bind: {
                    checked: '{filters.est_sousprojet}'
                }
            }, {
                xtype: 'checkbox',
                boxLabel: 'Inclure Annulés',
                flex: 1,
                margin: '2 4',
                checked: false,

                bind: {
                    checked: '{filters.est_annule}'
                }
            }]
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
                margin: '2 4'
            }, {
                xtype: 'button',
                ui: 'action',
                iconCls: 'x-fa fa-refresh',
                handler: 'onRefreshTap',
                tooltip: 'Actualiser',

                flex: 1,
                margin: '2 4'
            }, {
                xtype: 'button',
                ui: 'action',
                iconCls: 'x-fa fa-filter',
                handler: 'onClearFiltersTap',
                tooltip: 'Annuler Filtres',

                flex: 1,
                margin: '2 4'
            }]

        }
    }
});
