Ext.define('App.view.visit.ShowRisks', {
    extend: 'Ext.Panel',
    xtype: 'visitshowrisks',

    frame: true,

    title: 'Risques',
    iconCls: 'x-fa fa-warning',
    
    header: {
        items: [{
            xtype: 'component',
            ui: 'block',
            weigth: 10,
            bind: {
                html: 'nombre: <b>{riskscount}</b>'
            }
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-download',
            tooltip: 'Exporter sous Excel',
            handler: 'exportProductRisksList',
            ui: 'block',
            weigth: 20
        }]
    },

    minHeight: 300,
    layout: 'fit',

    items: [{
        xtype: 'grid',
        reference: 'visitRisksList',

        bind: '{risks}',
        
        ui: 'listing', 

        emptyText: 'Aucun risque',

        plugins: {
            listpaging: true,
            gridexporter: true
        },


        listeners: {
            // this event notifies us when the document was saved
            documentsave: 'onDocumentSave',
            beforedocumentsave: 'onBeforeDocumentSave'
        },

        selectable: {
            disabled: true
        },

        scrollable: {
            y: 'scroll'
        },

        hideHeaders: true,

        columns: [{
            text: 'Intitulé',
            dataIndex: 'name',
            flex: 1,

            cell: {
                encodeHtml: false
            },
            tpl: '<a class="item-title" href="#risk/{id}">{name}</a>'
        }]
    }]
    
});
