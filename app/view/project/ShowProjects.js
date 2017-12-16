Ext.define('App.view.project.ShowProjects', {
    extend: 'Ext.Panel',
    xtype: 'projectshowprojects',

    cls: 'project-projects',
    iconCls: 'x-fa fa-users',
    title: 'Projets',

    header: {
        items: [{
            xtype: 'button',
            handler: 'onProjectsCountTap',
            iconCls: 'x-fa fa-eye',
            ui: 'block',
            weigth: 10,
            bind: {
                text: '{record.projectscount}',
                tooltip: 'Afficher les projets relatifs à <b>{record.name}</b>.'
            }
        }]
    },

    items: [{
        xtype: 'list',
        bind: '{projects}',
        //ui: 'thumbnails',
        cls: 'office-details',
        minHeight: 80,

        itemTpl: '{intitule}',
        grouped: true,
        pinHeaders: true,

        emptyText: 'Aucun Projet concernant ce produit',

        listeners: {
            childtap: 'onProjectsChildTap'
        }
    }]
});
