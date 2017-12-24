Ext.define('App.view.moneva.Transport', {
    extend: 'Ext.Panel',
    xtype: 'transportchecklist',

    requires: [
        'Ext.panel.Collapser'
    ],

    collapsible: {
        direction: 'top',
        dynamic: true
    },
    

    defaults: {
        xtype: 'checkbox',
        labelTextAlign: 'left',
        padding: '0 0 0 80'
    },

    items: [{
        label: 'Etat du véhicule',
        labelAlign : 'top',
        labelTextAlign: 'left',
        padding: 0,

        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.etat_vehicule}',
            store: '{objetsetats}'
        }

    }, {        
        label: "Carnet de bord et d’entretien",
        bind: '{record.has_carnet_bord}'
    }, {
        label: "Registre d’évacuation",
        bind: '{record.has_registre_evacuation}'
    }, {
        label: "Police d’assurance",
        bind: '{record.has_police_assurance}'
    }]

    
});