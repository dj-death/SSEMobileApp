Ext.define('App.view.visit.RisksWizard', {
    extend: 'Ext.Dialog',
    xtype: 'riskswizard',

    controller: 'riskswizard',

    title: 'Liste des Risques',


    title: 'Ajouter un risque',
    titleAlign: 'center',

    width: 600,
    height: 500,

    closable: true,
    dismissHandler: true,

    layout: 'fit',

    items: [{
        xtype: 'tree',
        reference: 'risksTreeView',

        cls: 'risks-treeview',

        emptyText: 'Aucun Risque',
        bind: '{riskstree}',
        //ui: 'listing',

        rootVisible: true,

        selectable: {
            disabled: true
        },

        listeners: {
            childdoubletap: 'onRiskTap'
        },

        scrollable: {
            y: 'scroll'
        },

        columns: [{
            xtype: 'treecolumn',
            text: 'Intitulé',
            dataIndex: 'name',
            flex: 1
        }]
    }]
});