Ext.define('App.view.visit.RisksList', {
    extend: 'Ext.grid.Grid',
    xtype: 'riskslist',

    bodyPadding: 15,
    shadow: true,
    minHeight: 200,

    bind: '{visitRisks}',

    title: 'Liste des Risques',

    titleBar: {
        shadow: false,
        docked: 'top',
        items: [{
            align: 'right',
            xtype: 'button',
            iconCls: 'fa fa-plus',
            tooltip: 'Ajouter Risque',
            handler: 'onAddRisk'
        }]
    },

    ui: 'listing',

    emptyText: 'Aucun risque',

    rowNumbers: {
        minWidth: 35,
        align: 'center'
    },

    columns: [{
        text: 'Intitulé',
        dataIndex: 'name',
        flex: 1,

        cell: {
            tools: {
                close: {
                    handler: 'onRemoveRisk',
                    tooltip: 'Supprimer ce Risque',
                    zone: 'end'
                }
            }
        }
    }]
});
