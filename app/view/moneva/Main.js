Ext.define('App.view.moneva.Main', {
    extend: 'Ext.Panel',
    xtype: 'moneva',

    defaults: {
        frame: true,
        bodyPadding: 4,
        margin: '4 0',
        shadow: 'true',
        ui: 'dark'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    scrollable: {
        y: 'scroll'
    },


    items: [
        {
            title: 'Respect de la Convention',
            xtype: 'conventionchecklist'
        },
        {
            title: 'Sélection du projet',
            xtype: 'choixchecklist'
        },
        {
            title: 'Bénéficiaires',
            xtype: 'benefschecklist'
        },
        {
            title: "Création d'emplois",
            xtype: 'emploischecklist',
            reference: 'emploischecklist'
        },
        {
            title: 'Centres',
            xtype: 'centreschecklist',
            reference: 'centreschecklist'
        },
        {
            title: 'Infrastructures',
            xtype: 'infrastructureschecklist',
            reference: 'infrastructureschecklist'
        },
        {
            title: 'Transport',
            xtype: 'transportchecklist',
            reference: 'transportchecklist'
        },
        {
            title: 'Equipements et Matériels',
            xtype: 'equipementchecklist',
            reference: 'equipementchecklist'
        },
        {
            title: 'Prestation',
            xtype: 'prestationchecklist',
            reference: 'prestationchecklist'
        },
        {
            title: 'AGR',
            xtype: 'agrchecklist',
            reference: 'agrchecklist'
        },
        {
            title: 'Satisfaction',
            xtype: 'satisfactionchecklist'
        },
        {
            title: 'Projet en difficulté',
            xtype: 'problemeschecklist'
        }
    ]
});