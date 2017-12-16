Ext.define('App.view.visit.ShowRecommandations', {
    extend: 'Ext.Panel',
    xtype: 'visitshowrecommandations',

    title: 'Recommandations',

    bodyPadding: 15,
    shadow: true,

    header: {
        items: [{
            xtype: 'button',
            handler: 'saveAsDocx',
            iconCls: 'x-fa fa-file-word-o',
            ui: 'block',
            weigth: 10,
            tooltip: 'Exporter sous Word'
        }]
    },

    items: [{
        xtype: 'grid',
        bind: '{recommandations}',
        //ui: 'thumbnails',
        cls: 'office-details',

        emptyText: 'Aucune Recommandation associée à cette Visite',

        ui: 'listing',

        minHeight: 200,

        columns: [{
            text: 'Title',
            dataIndex: 'title',
            flex: 1
        }, {
            text: 'Contenu',
            dataIndex: 'content',
            flex: 2
        }, {
            text: 'Importance',
            dataIndex: 'importance',
            flex: 1
        }, {
            text: 'Urgence',
            dataIndex: 'urgency',
            flex: 1
        }],

        listeners: {
            childtap: 'onRecommandationChildTap'
        }
    }]
});
