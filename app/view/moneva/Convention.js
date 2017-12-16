Ext.define('App.view.moneva.Convention', {
    extend: 'Ext.Container',
    xtype: 'conventionchecklist',

    defaults: {
        xtype: 'checkbox',
        labelAlign: 'left',
        labelTextAlign: 'left',
        padding: '0 0 0 80'
    },

    items: [{
        label: 'Situation actuelle des réalisations',
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        bind: '{record.situation_realisations}',

        options: [
            { value: 1, label: 'En cours' },
            { value: 2, label: 'Opérationnel' },
            { value: 3, label: 'En difficulté' }
        ],

        listeners: {
            change: 'onStatutChange',
            buffer: 500
        }
        
    }, {
        boxLabel: 'Fonctionnement',
        bind: '{record.est_fonctionnel}'
    }, {
        boxLabel: 'Entretien & Maintenance',
        bind: '{record.has_maintenance}'
    }, {
        boxLabel: 'Visibilité',
        bind: '{record.has_visibilite}'
    }, {
        boxLabel: 'Assiette foncière apurée',
        reference: 'foncierChkbox',
        bind: '{record.has_assiette_fonciere_apuree}'
    }, {
        boxLabel: 'Etudes réalisées',
        bind: '{record.has_etudes}',
        reference: 'has_etudes'
    }, {
        boxLabel: "Accompagnement de l’AGR",
        bind: '{record.has_accompagnement}',
        reference: 'has_accompagnement'
    }, {
        boxLabel: 'Business plan / étude de faisabilité',
        bind: '{record.has_etudes}',
        reference: 'has_BP'
    }]

});