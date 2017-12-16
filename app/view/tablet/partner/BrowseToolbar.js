Ext.define('App.view.tablet.partner.BrowseToolbar', {
    extend: 'App.view.widgets.BrowseToolbar',
    // xtype: 'partnerbrowsetoolbar', -- set by profile

    items: {
        communes: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'value',
            placeholder: 'Toute Commune',
            queryMode: 'local',
            weight: 10,
            bind: {
                selection: '{filters.commune}',
                store: '{communes}'
            }
        },

        statuts: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'value',
            placeholder: 'Tout Statut',
            queryMode: 'local',
            weight: 10,
            bind: {
                selection: '{filters.statut_juridique}',
                store: '{statuts}'
            }
        },

        domaines: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'value',
            placeholder: 'Tout Domaine',
            queryMode: 'local',
            weight: 10,
            bind: {
                selection: '{filters.domaine}',
                store: '{domaines}'
            }
        },

        create: {
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            handler: 'onCreate',
            text: 'Ajouter Nouv. Partenaire',
            weight: 50
        }
    }
});
