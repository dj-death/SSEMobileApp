Ext.define('App.view.partner.ShowReport', {
    extend: 'Ext.Panel',
    xtype: 'partnershowreport',

    cls: 'partner-org',
    iconCls: 'x-fa fa-file-text-o',

    bind: {
        title:
            '<div class="title">Rapport de gestion</div>'/*+
            '<div class="caption">effectif : {record.effectif}</div>'*/
    },


    items: [{
        xtype: 'dataview',
        bind: '{reports}',
        ui: 'thumbnails',
        minHeight: 80,
        inline: true,
        emptyText: 'Aucun rapport n\'est disponible',
        itemTpl: '<div class="thumbnail" style="background-image:url({report})"></div>',
        listeners: {
            childtap: 'onReportChildTap'
        }
    }]
});
