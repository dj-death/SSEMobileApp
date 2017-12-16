Ext.define('App.view.tablet.recommandation.Browse', {
    extend: 'App.view.recommandation.Browse',
    // xtype: 'recommandationbrowse', -- set by profile

    requires: [
        'Ext.plugin.ListPaging',
        'Ext.grid.plugin.ViewOptions'
    ],

    controller: 'tablet-recommandationbrowse',

    tbar: {
        xtype: 'recommandationbrowsetoolbar'
    },

    bind: {
        title: 'Liste des Recommandations - {count} affichées',
    },


    items: [{
        xtype: 'grid',
        reference: 'recommandationsList',
        emptyText: 'Aucune recommandation orrespondante à votre recherche',
        bind: '{recommandations}',
        ui: 'listing',

        selectable: {
            disabled: true
        },

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
            tpl: '{name} ({count} Recommandations)'
        },

        columnLines: true,
        rowLines: true,
        forceFit: false,

        // There is no asymmetric data, we do not need to go to the expense of synching row heights
        syncRowHeight: true, //false,
        
        loadMask: true,

        multiColumnSort: true,

        selectable: {
            disabled: true
        },

        columns: [{
            text: 'Title',
            dataIndex: 'title',
            flex: 1
        }, {
            text: 'Contenu',
            dataIndex: 'content',
            flex: 2
        }, {
            text: 'Importance',
            dataIndex: 'importance',
            flex: 1
        }, {
            text: 'Urgence',
            dataIndex: 'urgency',
            flex: 1
        }, {
            text: 'Destinataire',
            dataIndex: 'destination',
            flex: 1
        }, {
            text: 'Commentaires',
            dataIndex: 'note',
            flex: 1
        }, {
            text: 'Faite',
            dataIndex: 'done',
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "X" : "";
            },
            exportRenderer: true,
            align: 'center',
            flex: 1
        }]
    }]
});