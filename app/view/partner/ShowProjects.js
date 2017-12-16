Ext.define('App.view.partner.ShowProjects', {
    extend: 'Ext.Panel',
    xtype: 'partnershowprojects',

    iconCls: 'x-fa fa-building-o',
    title: 'Projets portés',

    header: {
        items: [{
            xtype: 'button',
            handler: 'onPartnerProjectsCountTap',
            iconCls: 'x-fa fa-eye',
            ui: 'block',
            weigth: 10,
            bind: {
                text: '{record.projectscount}',
                tooltip: 'Afficher les projets portés par <b>{record.name}</b>.'
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

        emptyText: 'Aucun Projet porté par ce partenaire',

        listeners: {
            childtap: 'onProjectsChildTap'
        }
    }]
});
