Ext.define('App.view.tablet.mission.BrowseToolbar', {
    extend: 'App.view.widgets.BrowseToolbar',
    // xtype: 'missionbrowsetoolbar', -- set by profile

    items: {
        years: {
            xtype: 'combobox',
            valueField: 'value',
            displayField: 'value',
            placeholder: 'Toutes Années',
            queryMode: 'local',
            weight: 10,
            bind: {
                selection: '{filters.year}',
            },

            store: {
                fields: ['value'],
                data: [
                    [2017],
                    [2018],
                    [2019],
                    [2020],
                    [2021],
                    [2022]
                ]
            }
        },

        create: {
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            handler: 'onCreate',
            text: 'Nouvelle Mission',
            weight: 50
        }
    }
});
