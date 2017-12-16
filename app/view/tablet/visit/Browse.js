Ext.define('App.view.tablet.visit.Browse', {
    extend: 'App.view.visit.Browse',
    // xtype: 'visitbrowse', -- set by profile

    requires: [
        'Ext.grid.plugin.ViewOptions',
        'Ext.plugin.ListPaging'
    ],

    controller: 'tablet-visitbrowse',

    tbar: {
        xtype: 'visitbrowsetoolbar'
    },

    bind: {
        title: 'Liste des Visites - {count} Visites affichées',
    },


    listeners: {
        focus: 'onActivate'
    },

    items: [{
        xtype: 'grid',
        reference: 'visitsList',
        emptyText: 'Aucune visite correspondante à votre recherche',
        bind: '{visits}',
        ui: 'listing',

        plugins: {
            listpaging: {
                autoPaging: true
            },
            gridviewoptions: true
        },

        listeners: {
            childdoubletap: 'onChildActivate'
        },

        grouped: true,
        groupHeader: {
            tpl: '{name} ({count} Visites)'
        },

        columnLines: true,
        rowLines: true,
        forceFit: false,

        // There is no asymmetric data, we do not need to go to the expense of synching row heights
        syncRowHeight: false,
        
        loadMask: true,

        multiColumnSort: false,

        selectable: {
            disabled: true
        },

        columns: [
        {
            xtype: 'datecolumn',
            dataIndex: 'startDate',
            text: "Date",
            format: 'd F Y', 
            width: 100,

            exportStyle: {
                format: 'Short Date'
            }
            
        }, {
            text: 'Produit',
            dataIndex: 'product.name',
            groupable: false,
            hideable: false,

            align: 'left',
            locked: true,
            
            flex: 2,

            cell: {
                encodeHtml: false
            },
            tpl: [
                '<tpl for="product">',
                    '<a class="item-title" href="#{url}">{name}</a>',
                    '<div class="item-caption">{quartier_douar}, {commune}</div>',
                '</tpl>'
            ]
        }, {
            text: 'Nb. de Projets',
            xtype: 'numbercolumn',
            format: '0',
            dataIndex: 'projectscount',
            align: 'center'/*,

            summary: 'sum',
            summaryFormatter: 'plural("projet")'*/

        }, {
            text: 'Responsable',
            dataIndex: 'assignee.lastname',
            flex: 2,
            align: 'center',
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<tpl for="assignee">',
                    '<a class="item-title" href="#{url}">{fullname}</a>',
                    '<div class="item-caption">{title}</div>',
                '</tpl>'
            ]
        }]
    }]
});
