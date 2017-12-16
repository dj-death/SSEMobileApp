Ext.define('App.view.moneva.Choix', {
    extend: 'Ext.Container',
    xtype: 'choixchecklist',

    defaults: {
        xtype: 'checkbox',
        labelAlign: 'left',
        labelTextAlign: 'left',
        padding: '0 0 0 80'
    },

    items: [{
        boxLabel: "Circuit d’approbation respecté",
        bind: '{record.has_respect_circuit_approbation}'
    }, {
        boxLabel: "Critères d'éligibilité respectés",
        bind: '{record.est_eligible}'
    }, {
        boxLabel: "Grilles de notation utilisée",
        bind: '{record.has_usage_grille_notation}'
    }, {
        boxLabel: "Avis préalable du service technique",
        bind: '{record.has_avis_service_technique}'
    }, {
        boxLabel: "Montage projet initial respecté",
        bind: '{record.has_respect_montage_initial}'
    }]

});