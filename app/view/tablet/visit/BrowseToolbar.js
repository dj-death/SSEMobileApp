Ext.define('App.view.tablet.visit.BrowseToolbar', {
    extend: 'App.view.widgets.BrowseToolbar',
    // xtype: 'visitbrowsetoolbar', -- set by profile

    items: {
        
        assignees: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'label',
            placeholder: 'Tout Cadre',
            queryMode: 'local',
            weight: 11,
            bind: {
                selection: '{filters.assignee}',
                store: '{employees}'
            }
        },

        mission: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'label',
            placeholder: 'Toute Mission',
            queryMode: 'local',
            weight: 12,
            bind: {
                selection: '{filters.mission}',
                store: '{missions}'
            }
        },


        product: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'label',
            placeholder: 'Tout Produit',
            queryMode: 'local',
            weight: 13,
            bind: {
                selection: '{filters.product}',
                store: '{products}'
            }
        },

        create: {
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            handler: 'onCreate',
            text: 'Nouvelle visite',
            weight: 50
        }
    }
});
