Ext.define('App.view.partner.Financials', {
    extend: 'Ext.grid.Grid',
    xtype: 'financials',

    bodyPadding: 15,
    shadow: true,
    minHeight: 200,

    store: 'Finances',

    title: 'Etats Financiers',
    titleBar: {
        shadow: false,
        docked: 'top',
        items: [{
            align: 'right',
            xtype: 'button',
            iconCls: 'fa fa-plus',
            tooltip: 'Ajouter Etat financier',
            handler: 'onCreateReport'
        }]
    },

    ui: 'listing',

    listeners: {
        childdoubletap: 'onReportEdit'
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
                    handler: 'removeReport',
                    tooltip: 'Supprimer cet Etat',
                    zone: 'end'
                }
            }
        }
    }, {
        xtype: 'numbercolumn',
        text: 'C.A prévu',
        dataIndex: 'CA_prevu'
    }, {
        xtype: 'numbercolumn',
        text: 'C.A réel',
        dataIndex: 'CA_reel'
    }, {
        xtype: 'numbercolumn',
        text: 'Résultat net prevu',
        dataIndex: 'resultat_net_prevu'
    }, {
        xtype: 'numbercolumn',
        text: 'Résultat net réel',
        dataIndex: 'resultat_net_reel'
    }, {
        xtype: 'numbercolumn',
        text: 'BFR',
        dataIndex: 'BFR'
    }, {
        xtype: 'numbercolumn',
        text: 'Capitaux propres',
        dataIndex: 'capitaux_propres'
    }, {
        xtype: 'numbercolumn',
        text: 'Dettes MLT',
        dataIndex: 'dettes_MLT'
    }, {
        xtype: 'numbercolumn',
        text: 'Dettes CT',
        dataIndex: 'dettes_CT'
    }, {
        xtype: 'numbercolumn',
        text: 'Immobilisations',
        dataIndex: 'immobilisations'
    }, {
        xtype: 'numbercolumn',
        text: 'Créances',
        dataIndex: 'creances'
    }, {
        xtype: 'numbercolumn',
        text: 'Stocks',
        dataIndex: 'stocks'
    }, {
        xtype: 'numbercolumn',
        text: 'Trésorerie',
        dataIndex: 'tresorerie'
    }, {
        xtype: 'numbercolumn',
        text: 'Subventions',
        dataIndex: 'total_subventions'
    }, {
        xtype: 'numbercolumn',
        text: 'Loyer',
        dataIndex: 'loyer'
    }, {
        xtype: 'numbercolumn',
        text: 'Frais personnel',
        dataIndex: 'frais_personnel'
    }, {
        xtype: 'numbercolumn',
        text: 'Total_recettes',
        dataIndex: 'total_recettes'
    }, {
        xtype: 'numbercolumn',
        text: 'Total dépenses',
        dataIndex: 'total_depenses'
    }, {
        xtype: 'numbercolumn',
        text: 'Solde fin de période',
        dataIndex: 'solde'
    }]
});
