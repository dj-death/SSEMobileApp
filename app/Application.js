Ext.define('App.Application', {
    extend: 'Ext.app.Application',

    name: 'App',

    // Since all the files in the ./app folder should be included in the final build, let's
    // require all application classes (App.*) and avoid redundant 'requires' in each files.
    requires: [
        'App.*',
        'Ext.MessageBox'
    ],

    profiles: [
        'Phone',
        'Tablet'
    ],

    controllers: [
        'Action'    // creates one global instance of the Action controller
    ],

    stores: [
        'Meta',
        'Predicts',
        'Menu',
        'INDH.Secteurs', 'INDH.SousSecteurs', 'INDH.Rubriques', 'INDH.Programmes',
        'INDH.Communes', 'INDH.Quartiers', 'INDH.Domaines',
        'INDH.Annees',
        'INDH.Statuts', 'INDH.Motifs', 'INDH.StatutsJuridiques',


        'metrics.Etats', 'metrics.ObjetsEtats', 'metrics.Qualites', 'metrics.Usages',
        'metrics.Satisfactions', 'metrics.Suffisances', 'metrics.Degrees', 
        
        'Recommandations',
        'Finances',
        'ProductFinances',
        'Members',
        'KPIs'
    ],

    viewport: {
        controller: 'viewport',
        viewModel: 'viewport'
    },

    defaultToken: 'home',

    init: function () {
		document.title = "T@QyEM By DIDI Mohamed";
	},

    launch: function(profile) {
        if (Ext.isIE8) {
            Ext.Msg.alert('Not Supported', 'T@Qyem is not supported on Internet Explorer 8. Please use a different browser.');
            return;
        }

        // The viewport controller requires xtype defined by profiles, so let's perform extra
        // initialization when the application and its dependencies are fully accessible.
        Ext.Viewport.getController().onLaunch();
        Ext.getBody().removeCls('launching');

        this.callParent([profile]);
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Mise à jour', 'Une mise à jour de l\'application est disponsible, voulez vous actualiser la page ?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
