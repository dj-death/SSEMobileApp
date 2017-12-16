Ext.define('App.view.tablet.project.BrowseToolbar', {
    extend: 'App.view.widgets.BrowseToolbar',
    // xtype: 'projectbrowsetoolbar', -- set by profile

    items: {
        search: null,

        search_panel: {
            xtype: 'container',
            weight: 0,
            margin: '0 10 0 0',
            autoSize: true,
            width: 154,

            items: [{
                xtype: 'searchfield',
                reference: 'search',
                clearable: true,
                placeholder: 'Rechercher',
                userCls: 'expandable',
                bind: '{filters.search}'
            }, {
                xtype: 'checkbox',
                boxLabel: 'Inclure Sous-Projets',
                
                checked: false,

                bind: {
                    checked: '{filters.est_sousprojet}'
                }
            }, {
                xtype: 'checkbox',
                boxLabel: 'Inclure Annulés',
                
                checked: false,

                bind: {
                    checked: '{filters.est_annule}'
                }
            }]
        },

        general: {
            xtype: 'container',
            weight: 10,

            margin: '0 10 0 0',
            autoSize: true,

            width: 145,

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
                }
            }, {
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Programme',
                queryMode: 'local',
                bind: {
                    selection: '{filters.programme}',
                    store: '{programmes}'
                }
            }]
        },

        localisation: {
            xtype: 'container',
            weight: 11,

            margin: '0 10 0 0',
            autoSize: true,

            width: 145,

            items: [{
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Commune',
                queryMode: 'local',
                bind: {
                    selection: '{filters.commune}',
                    store: '{communes}'
                }
            }, {
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Quartier',
                queryMode: 'local',
                bind: {
                    selection: '{filters.quartier}',
                    store: '{quartiers}'
                }
            }]
        },

        types: {
            xtype: 'container',
            weight: 12,
            margin: '0 10 0 0',
            autoSize: true,

            width: 145,

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
                }
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
                }
            }]
        },

        types2: {
            xtype: 'container',
            weight: 13,
            margin: '0 10 0 0',
            autoSize: true,
            width: 145,

            items: [{
                xtype: 'selectfield',
                placeholder: 'EPS & Autres',
                options: [{
                    text: 'EPS',
                    value: true
                }, {
                    text: 'Non EPS',
                    value: false
                }],

                bind: {
                    selection: '{filters.est_EPS}'
                }
            }, {
                xtype: 'selectfield',
                placeholder: 'Infrastr. & Autres',
                options: [{
                    text: 'Infrastructure',
                    value: true
                }, {
                    text: 'Non Infrastructure',
                    value: false
                }],

                bind: {
                    selection: '{filters.est_infrastructure}'
                }
            }]
        },

        types3: {
            xtype: 'container',
            weight: 14,
            margin: '0 10 0 0',
            autoSize: true,
            width: 145,

            items: [{
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Secteur',
                queryMode: 'local',
                bind: {
                    selection: '{filters.secteur}',
                    store: '{secteurs}'
                }
            }, {
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Sous-secteur',
                queryMode: 'local',
                bind: {
                    selection: '{filters.soussecteur}',
                    store: '{soussecteurs}'
                }
            }]
        },

        statuts: {
            xtype: 'container',
            weight: 14,
            margin: '0 10 0 0',
            autoSize: true,
            width: 145,

            items: [{
                xtype: 'selectfield',
                placeholder: 'Milieu',
                options: [{
                    text: 'Rural',
                    value: 'Commune_Rurale'
                }, {
                    text: 'Urbain',
                    value: 'Commune_Urbaine'
                }, {
                    text: 'Intercommunal',
                    value: 'INTERCOMMUNAL'
                }],

                bind: {
                    selection: '{filters.nature_commune}'
                }

            }, {
                xtype: 'combobox',
                valueField: 'value',
                displayField: 'value',
                placeholder: 'Statut',
                queryMode: 'local',
                bind: {
                    selection: '{filters.statut}',
                    store: '{statuts}'
                }
            }]

        },

        types2: {
            xtype: 'container',
            weight: 15,
            margin: '0 10 0 0',
            autoSize: true,
            width: 145,

            items: [{
                xtype: 'selectfield',
                placeholder: 'En souffrance',
                options: [{
                    text: 'Oui',
                    value: true
                }, {
                    text: 'Non',
                    value: false
                }],

                bind: {
                    selection: '{filters.en_souffrance}'
                }
            }]
        },


        toggleGrouping: {
            handler: 'onToggleGroupTap',
            tooltip: 'Grouper',
            bind: {
                iconCls: '{toogleGroupIconCls}'
            },
            weight: 30
        },

        create: {
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            handler: 'onCreate',
            text: 'Projet',
            weight: 50
        }
    }
});
