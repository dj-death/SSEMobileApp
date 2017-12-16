Ext.define('App.view.phone.product.Browse', {
    extend: 'App.view.product.Browse',
    // xtype: 'productbrowse', -- set by profile

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

    tbar: {
        xtype: 'productbrowsetoolbar'
    },

    bind: {
        title: '{count} Produits affichés',
    },


    items: [{
        xtype: 'list',
        bind: '{products}',
        striped: true,
        ui: 'listing',

        indexBar: true,
        itemTpl: '{commune}',
        grouped: true,
        pinHeaders: false,

        selectable: {
            disabled: true
        },

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
            '<div class="item-details">',
                '<div class="item-title">{name}</div>',
                '<div class="item-caption">{commune}, {quartier_douar}</div>',
            '</div>',
            '<div class="item-stats">',
                '<a href="#projects/product/{id}">',
                    '{projectscount:plural("projet")}',
                '</a>',
            '</div>'
        ],

        listeners: {
            childtap: 'onChildActivate'
        }
    }]
});
