Ext.define('App.view.phone.visit.Browse', {
    extend: 'App.view.visit.Browse',
    // xtype: 'productbrowse', -- set by profile

    requires: [
        'Ext.dataview.listswiper.ListSwiper',
        'Ext.dataview.plugin.ListPaging'
    ],

    header: {
        items: {
            create: {
                xtype: 'button',
                iconCls: 'x-fa fa-plus',
                handler: 'onCreate',
                weight: 10
            }
        }
    },

    items: [{
        xtype: 'list',
        bind: '{visits}',
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
                '<tpl for="product">',
                    '<div class="item-title">{name}</div>',
                    '<div class="item-caption">{quartier_douar}, {commune}</div>',
                '</tpl>',
                    '<div class="item-caption">{startDate:date("d/m/Y")}</div>',
            '</div>',

            '<div class="item-stats">',
                '<tpl for="assignee">',
                    '<div class="time" style="color: {color};">{lastname}</div>',
                '</tpl>',
            '</div>'
        ],

        listeners: {
            childtap: 'onChildActivate'
        }
    }]
});