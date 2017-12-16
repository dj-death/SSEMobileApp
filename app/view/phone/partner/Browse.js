Ext.define('App.view.phone.partner.Browse', {
    extend: 'App.view.partner.Browse',
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
        xtype: 'partnerbrowsetoolbar'
    },

    bind: {
        title: '{count} Partenaires affichés',
    },


    items: [{
        xtype: 'list',
        bind: '{partners}',
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
                '<div class="item-caption">{commune}, <a href="tel:{phone}">{phone}</a></div>',
            '</div>'
        ],

        listeners: {
            childtap: 'onChildActivate'
        }
    }]
});