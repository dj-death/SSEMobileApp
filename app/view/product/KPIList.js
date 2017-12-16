Ext.define('App.view.product.KPIList', {
    extend: 'Ext.grid.Grid',
    xtype: 'kpilist',

    bodyPadding: 15,
    shadow: true,
    minHeight: 200,

    store: 'KPIs',

    title: 'Indicateurs d\'évaluation',
    titleBar: {
        shadow: false,
        docked: 'top',
        items: [{
            align: 'right',
            xtype: 'button',
            iconCls: 'fa fa-plus',
            tooltip: 'Ajouter KPI',
            handler: 'onCreateKPI'
        }]
    },

    ui: 'listing',

    listeners: {
        childdoubletap: 'onKPIEdit'
    },

    rowNumbers: {
        minWidth: 35,
        align: 'center'
    },

    columns: [{
        text: 'Exercice',
        dataIndex: 'exercice',
        cell: {
            tools: {
                close: {
                    handler: 'removeKPI',
                    tooltip: 'Supprimer cet Indicateur',
                    zone: 'end'
                }
            }
        }
    }, {
        text: 'Intitulé',
        dataIndex: 'name'
    }, {
        xtype: 'numbercolumn',
        text: 'Valeur',
        dataIndex: 'value'
    }, {
        xtype: 'numbercolumn',
        text: 'V. Cible',
        dataIndex: 'target'
    }, {
        text: 'Source',
        dataIndex: 'source'
    }, {
        text: 'Commentaires',
        dataIndex: 'comment'
    }]
});
