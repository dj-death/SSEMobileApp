Ext.define('App.view.tablet.person.Browse', {
    extend: 'App.view.person.Browse',
    // xtype: 'personbrowse', -- set by profile

    requires: [
        'Ext.plugin.ListPaging'
    ],

    controller: 'tablet-personbrowse',

    tbar: {
        xtype: 'personbrowsetoolbar'
    },

    items: [{
        xtype: 'grid',
        emptyText: 'No employee was found to match your search',
        bind: '{people}',
        ui: 'listing',

        selectable: {
            disabled: true
        },

        plugins: [{
            type: 'listpaging',
            autoPaging: true
        }],

        columnMenu: {
            items: {
                groupByThis: false,
                showInGroups: false
            }
        },

        columns: [{
            dataIndex: 'picture',
            menuDisabled: true,
            hideable: false,
            sortable: false,
            align: 'center',
            width: 58,
            cell: {
                encodeHtml: false
            },
            tpl: '<div class="picture" style="background-image: url({picture})"></div>'
        }, {
            text: 'Nom / Statut',
            dataIndex: 'lastname',
            flex: 1,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<a class="item-title" href="#{url}">{fullname}</a>',
                '<div class="item-caption">{title}</div>'
            ]
        }, {
            sortable: false,
            text: 'Email/Télephone',
            flex: 1,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<div class="item-info"><span class="x-fa fa-envelope-o"></span> {email}</div>',
                '<div class="item-info"><span class="x-fa fa-phone"></span> {phone}</div>'
            ]
        }],

        listeners: {
            childdoubletap: 'onChildActivate'
        }
    }]
});
