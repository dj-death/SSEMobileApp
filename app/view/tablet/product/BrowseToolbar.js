Ext.define('App.view.tablet.product.BrowseToolbar', {
    extend: 'App.view.widgets.BrowseToolbar',
    // xtype: 'productbrowsetoolbar', -- set by profile

    items: {
        communes: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'value',
            placeholder: 'Toute Commune',
            queryMode: 'local',
            weight: 12,
            bind: {
                selection: '{filters.commune}',
                store: '{communes}'
            }
        },

        quartiers: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'value',
            placeholder: 'Tout Quartier',
            queryMode: 'local',
            weight: 13,
            bind: {
                selection: '{filters.quartier}',
                store: '{quartiers}'
            }
        },

        types: {
            xtype: 'selectfield',
            placeholder: 'Tout Type',

            weight: 14,

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

        secteurs: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'value',
            placeholder: 'Tout Secteur',
            queryMode: 'local',
            weight: 15,
            bind: {
                selection: '{filters.secteur}',
                store: '{secteurs}'
            }
        },

        soussecteurs: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'value',
            placeholder: 'Tout Sous-secteur',
            queryMode: 'local',
            weight: 16,
            bind: {
                selection: '{filters.soussecteur}',
                store: '{soussecteurs}'
            }
        },

        create: {
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            handler: 'onCreate',
            text: 'Nouveau Produit',
            weight: 50
        }
    }
});
