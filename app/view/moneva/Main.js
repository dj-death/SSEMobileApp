Ext.define('App.view.moneva.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'moneva',


    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    activeTab: 0,


    tabBar: {
        docked: 'left',
        flex: 1,
        scrollable: 'y',

        /*defaultTabUI: 'flat',
        ui: 'flat',*/

        layout: {
            align: 'stretch'/*,
            overflowHandler: 'none'*/
        }
    },

    defaults: {
        userCls: 'wizard-screen',
        scrollable: 'y',
        padding: '15 10'
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