Ext.define('App.view.mission.ShowVisits', {
    extend: 'Ext.Panel',
    xtype: 'missionshowvisits',

    iconCls: 'x-fa fa-users',
    title: 'Visites',

    header: {
        items: [{
            xtype: 'button',
            handler: 'onVisitsCountTap',
            iconCls: 'x-fa fa-eye',
            ui: 'block',
            weigth: 10,
            bind: {
                text: '{record.visitscount}',
                tooltip: 'Afficher les visites de <b>{record.name}</b>.'
            }
        }]
    },

    items: [{
        xtype: 'dataview',
        bind: '{visits}',
        ui: 'thumbnails',
        minHeight: 80,
        inline: true,
        emptyText: 'Aucune Visite concernant cette mission',
        itemTpl: '<div class="thumbnail" style="background-image:url({picture})"></div>',
        listeners: {
            childtap: 'onVisitsChildTap'
        }
    }]
});
