Ext.define('App.view.tablet.history.Browse', {
    extend: 'App.view.history.Browse',
    // xtype: 'historybrowse', -- set by profile

    requires: [
        'Ext.plugin.ListPaging'
    ],

    tbar: {
        xtype: 'historybrowsetoolbar'
    },

    items: [{
        xtype: 'grid',
        emptyText: 'Aucune activité correspond à votre recherche',
        bind: '{history}',
        ui: 'listing',

        grouped: true,
        groupHeader: {
            tpl: '{name} ({count} Actions)'
        },

        columnLines: true,
        rowLines: true,
        
        loadMask: true,

        multiColumnSort: false,

        syncRowHeight: true, //false,

        selectable: {
            disabled: true
        },


        plugins: [{
            type: 'listpaging',
            autoPaging: true
        }],

        columns: [{
            xtype: 'datecolumn',
            dataIndex: 'created',
            format: 'd F Y H:i',
            text: 'Date',
            width: 200
        }, {
            dataIndex: 'type',
            text: 'Action',
            flex: 1,
            align: 'center'
        }, {
            dataIndex: 'object',
            text: 'Objet',
            flex: 1,
            align: 'center',

            cell: {
                encodeHtml: false
            },

            tpl: '<a class="item-title" href="#{object}">{object}</a>'

        }, {
            dataIndex: 'subject',
            text: 'Contenu',
            flex: 3,

            cell: {
                encodeHtml: false
            },

            tpl: '{subject}'
        }, {
            text: 'Auteur',
            dataIndex: 'recipient.lastname',
            flex: 1,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<tpl for="recipient">',
                    '<a class="item-title" href="#{url}">{fullname}</a>',
                    '<div class="item-caption">{title}</div>',
                '</tpl>'
            ]
        }]
    }]
});
