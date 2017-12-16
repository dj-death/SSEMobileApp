Ext.define('App.view.visit.Recommandations', {
    extend: 'Ext.grid.Grid',
    xtype: 'recommandations',

    bodyPadding: 15,
    shadow: true,
    minHeight: 200,

    reference: 'recommandationsgrid',

    //bind: '{recommandations}',
    store: 'Recommandations',

    title: 'Recommandations',
    titleBar: {
        shadow: false,
        docked: 'top',
        items: [{
            align: 'right',
            xtype: 'button',
            iconCls: 'fa fa-plus',
            tooltip: 'Ajouter Recommandation',
            handler: 'onCreateRecommandation'
        }]
    },

    ui: 'listing',

    listeners: {
        childdoubletap: 'onRecommandationEdit'
    },

    rowNumbers: {
        minWidth: 35,
        align: 'center'
    },

    columns: [{
        text: 'Title',
        dataIndex: 'title',
        flex: 1,
        cell: {
            tools: {
                close: {
                    handler: 'removeRecommandation',
                    tooltip: 'Supprimer cette Recommandation',
                    zone: 'end'
                }
            }
        }
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
    }, {
        text: 'Destinataire',
        dataIndex: 'destination',
        flex: 1
    }, {
        text: 'Commentaires',
        dataIndex: 'note',
        flex: 1
    }, {
        xtype: 'checkcolumn',
        text: 'Faite',
        dataIndex: 'done',
        flex: 1
    }]

});
