Ext.define('App.store.Menu', {
    extend: 'Ext.data.Store',

    alias: 'store.menu',

    data: [
        {   
            id: 'home',
            xtype: 'home',
            text: 'Accueil',
            icon: 'home',
            role: 3
        }, {
            id: 'stats',
            xtype: 'statshome',
            text: 'Statistiques',
            icon: 'line-chart',
            role: 3
        }, {
            id: 'projects',
            xtype: 'projectbrowse',
            text: 'Projets',
            icon: 'database',
            role: 3
        }, {
            id: 'products',
            xtype: 'productbrowse',
            text: 'Produits',
            icon: 'building-o',
            role: 2
        }, {
            id: 'partners',
            xtype: 'partnerbrowse',
            text: 'Partenaires',
            icon: 'users',
            role: 2
        }, {
            id: 'risks',
            xtype: 'riskhome',
            text: 'Cartographie',
            icon: 'warning',
            role: 1
        }, {
            id: 'missions',
            xtype: 'missionbrowse',
            text: 'Planification',
            icon: 'briefcase',
            role: 1
        }, {
            id: 'visits',
            xtype: 'visitbrowse',
            text: 'Visites',
            icon: 'eye',
            role: 1
        }, {
            id: 'annexes',
            xtype: 'annexebrowse',
            text: 'Annexes',
            icon: 'table',
            role: 2
        },{
            id: 'recommandations',
            xtype: 'recommandationbrowse',
            text: 'Recommandation',
            icon: 'list-ol',
            role: 1
        }, {
            id: 'history',
            xtype: 'historybrowse',
            text: 'Historique',
            icon: 'history',
            role: 2
        }, {
            id: 'people',
            xtype: 'personbrowse',
            text: 'Utilisateurs',
            icon: 'user',
            role: 0
        }
    ]

});
