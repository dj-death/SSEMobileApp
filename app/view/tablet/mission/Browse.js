Ext.define('App.view.tablet.mission.Browse', {
    extend: 'App.view.mission.Browse',
    // xtype: 'missionbrowse', -- set by profile

    requires: [
        'Ext.plugin.ListPaging'
    ],

    controller: 'tablet-missionbrowse',

    tbar: {
        xtype: 'missionbrowsetoolbar'
    },

    items: [{
        xtype: 'grid',
        emptyText: 'Aucune Mission correspondante à votre recherche',
        bind: '{missions}',
        ui: 'listing',

        plugins: {
            listpaging: true
        },

        rowNumbers: {
            minWidth: 40,
            align: 'center'
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
            text: 'Intitulé',
            dataIndex: 'name',
            flex: 2,
            cell: {
                encodeHtml: false
            },
            tpl: '<a class="item-title" href="#{url}">{name}</a>'
        },
        {
            xtype: 'datecolumn',
            dataIndex: 'start_date',
            text: "Début de Mission",
            format: 'd/m/Y',            
            flex: 1
        },
        {
            xtype: 'datecolumn',
            format: 'd/m/Y',
            dataIndex: 'end_date',
            text: "Fin de Mission",
            flex: 1
        },
        {
            xtype: 'numbercolumn',
            format: '0',
            dataIndex: 'days_remaining',
            text: 'Jours Restants',
            flex: 1
        },
        {
            dataIndex: 'statusName',
            text: 'Statut',
            flex: 1
        }, 
        {
            text: 'Nb. Visites',
            dataIndex: 'visitscount',
            flex: 1,
            cell: {
                encodeHtml: false
            },
            
            tpl: [
                '<a href="#visits/mission/{id}">',
                    '{visitscount:plural("visite")}',
                    '<div class="item-caption">Pour {projectscount:plural("projet")}</div>',
                '</a>'
            ]
            
        }],

        listeners: {
            childdoubletap: 'onChildActivate'
        }
    }]
});
