Ext.define('App.view.moneva.Beneficiaires', {
    extend: 'Ext.Panel',
    xtype: 'benefschecklist',

    requires: [
        'Ext.panel.Collapser'
    ],

    collapsible: {
        direction: 'top',
        dynamic: true
    },

    defaults: {
        labelTextAlign: 'left'
    },

    items: [{
        xtype: 'spinnerfield',
        label: 'Population totale',
        bind: '{record.pop_benef_total_reel}',
        
        clearable: true,
        stepValue: 1
    }, {
        xtype: 'spinnerfield',
        label: 'Hommes',
        bind: '{record.pop_benef_homme_reel}',
        
        clearable: true,
        stepValue: 1
    }, {
        xtype: 'spinnerfield',
        label: 'Femmes',
        bind: '{record.pop_benef_femme_reel}',
        
        clearable: true,
        stepValue: 1
    }, {
        xtype: 'spinnerfield',
        label: 'Jeunes',
        bind: '{record.pop_benef_jeune_reel}',
        
        clearable: true,
        stepValue: 1
    }, {
        xtype: 'spinnerfield',
        reference: 'pop_benef_menage',
        label: 'Ménages',
        bind: '{record.pop_benef_menage_reel}',
        
        clearable: true,
        stepValue: 1
    }, {        
        label: "Bénéficiaires cibles de l’INDH ?",
        xtype: 'checkbox',
        labelAlign: 'left',
        padding: '0 0 0 80',
        bind: '{record.has_benef_cibles}'
    }, {
        xtype: 'textareafield',
        reference: 'tarifs_comment',
        label: 'Commentaire / Bénéficiaires',
        bind: '{record.comment_benefs}',
    }]

});