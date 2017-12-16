Ext.define('App.view.phone.project.Browse', {
    extend: 'App.view.project.Browse',
    // xtype: 'projectbrowse', -- set by profile

    requires: [
        'Ext.dataview.listswiper.ListSwiper',
        'Ext.dataview.plugin.ListPaging'
    ],

    header: {
        items: {
            filter: {
                xtype: 'button',
                iconCls: 'x-fa fa-search',
                handler: 'onFilterTap',
                weight: 10
            }
        }
    },

    bind: {
        title: '{count} Projets affichés',
    },

    tbar: {
        xtype: 'projectbrowsetoolbar'
    },


    controller: 'phone-projectbrowse',

    items: [{
        xtype: 'list',
        reference: 'list',
        bind: '{projects}',
        striped: true,
        ui: 'listing',
        selectable: {
            disabled: true
        },

        indexBar: true,
        grouped: true,
        pinHeaders: false,

        emptyText: 'Aucun projet correspondant à votre recherche',
        loadingText: "Chargement...",

        plugins: [{
            type: 'listpaging',
            autoPaging: true
        }, {
            type: 'listswiper',
            right: [{
                iconCls: 'x-fa fa-pencil',
                commit: 'onEditAction',
                text: 'Edit',
                ui: 'edit'
            }]
        }],

        itemTpl: [
            '<div class="history-visual statut-cell">',
                '<span class="statut-icon {statutcls:pick("non-demarre", "etude", "lancement","execution", "retard", "acheve", "operationnel", "difficulte", "arret", "resilie", "annule")}"></span>',
            '</div>',

            '<div class="item-details intitule-cell">',
                '<div class="item-title {statutcls:pick("non-demarre", "etude", "lancement","execution", "retard", "acheve", "operationnel", "difficulte", "arret", "resilie", "annule")}">{intitule}</div>',
                '<div class="item-caption">{commune}, {quartier_douar}</div>',
            '</div>',

            '<div class="item-stats">',
                '<div class="time">{annee}</div>',
                '<div class="date center-text">{programme:substr(0,1)}</div>',
            '</div>'
        ],

        listeners: {
            childtap: 'onChildActivate'
        }
    }]
});
