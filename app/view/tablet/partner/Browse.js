Ext.define('App.view.tablet.partner.Browse', {
    extend: 'App.view.partner.Browse',
    // xtype: 'partnerbrowse', -- set by profile

    requires: [
        'Ext.plugin.ListPaging',
        'Ext.grid.plugin.ViewOptions'
    ],

    controller: 'tablet-partnerbrowse',

    tbar: {
        xtype: 'partnerbrowsetoolbar'
    },

    bind: {
        title: 'Liste des Partenanires - {count} Partenaires affichés',
    },


    items: [{
        xtype: 'grid',
        reference: 'partnersList',
        emptyText: 'Aucun partenaire correspondant à votre recherche',
        bind: '{partners}',
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
            tpl: '{name} ({count} Partenaires)'
        },

        columnLines: true,
        rowLines: true,
        forceFit: false,

        // There is no asymmetric data, we do not need to go to the expense of synching row heights
        syncRowHeight: true, //false,
        
        loadMask: true,

        multiColumnSort: false,

        selectable: {
            disabled: true
        },

        columns: [{
            text: 'Dénomination',
            dataIndex: 'name',
            
            width: 300,
            cell: {
                encodeHtml: false
            },

            tpl: '<a class="item-title" href="#{url}">{name}</a>'
        }, {
            text: 'Statut juridique',
            dataIndex: 'statut_juridique'
            
        }, {
            text: 'R.U.P',
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "X" : "";
            },
            exportRenderer: true,
            align: 'center',

            dataIndex: 'est_rup',
            hidden: true
            
        }, {
            xtype: 'datecolumn',
            text: 'Date de création',
            dataIndex: 'date_creation',

            minWidth: 95,
            format: 'd/m/Y'      
        }, {
            text: 'Président',
            dataIndex: 'president'
            
        }, {
            text: 'Effectif',
            xtype: 'numbercolumn',
            format:'0',
            dataIndex: 'effectif',
            hidden: true
            
        }, {
            text: 'Parité',
            dataIndex: 'parite',
            hidden: true
        },{
            text: 'Domaine d\'activité',
            dataIndex: 'domaine'
            
        }, {
            text: 'Commune',
            dataIndex: 'commune'
            
        }, {
            text: 'Téléphone',
            dataIndex: 'phone'
            
        }, {
            text: 'Localisation',
            dataIndex: 'commune',
            align: 'center',
            hidden: true,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<div class="item-title">{commune}</div>',
                '<div class="item-caption">{address}<div>',
                '<div class="item-info"><span class="x-fa fa-envelope-o"></span> {email}</div>',
                '<div class="item-info"><span class="x-fa fa-phone"></span> {phone}</div>'
            ]

        }, {
            text: 'Produits gérés',
            dataIndex: 'productscount',
            cell: {
                encodeHtml: false
            },
            
            tpl: [
                '<a href="#products/management/{id}">',
                    '{productscount:plural("produit")}',
                '</a>'
            ]
        }, {
            text: 'Contributions INDH / projets',
            xtype: 'numbercolumn',
            format:'0',
            dataIndex: 'INDH_contributions',
            hidden: true
            
        }, {
            text: 'Dossier réglementaire ?',
            align: 'center',
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "X" : "";
            },

            dataIndex: 'has_dossier_reglementaire',
            hidden: true
            
        }, {
            text: 'Tenue régulière A.G ?',
            align: 'center',
            dataIndex: 'does_respect_tenue_AG',
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "X" : "";
            },
            hidden: true
            
        }, {
            xtype: 'datecolumn',
            text: 'Dernière A.G',
            dataIndex: 'date_derniere_AG',
            minWidth: 95,
            format: 'd/m/Y'      
        }, {
            text: 'Elabor. Rapports ?',
            align: 'center',
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "X" : "";
            },
            dataIndex: 'has_rapports',
            hidden: true
            
        }, {
            text: 'Elabor. Bilans ?',
            align: 'center',
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "X" : "";
            },
            dataIndex: 'has_elaboration_bilan',
            hidden: true
            
        }, {
            text: 'Certification Comptes ?',
            align: 'center',
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "X" : "";
            },
            dataIndex: 'has_certification_comptes',
            hidden: true
            
        }, {
            text: 'Accomp. & Formations ?',
            align: 'center',
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "X" : "";
            },
            dataIndex: 'has_accompagnement_formation',
            hidden: true
            
        }, {
            text: 'SGFC satisfaisant',
            align: 'center',
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "X" : "";
            },
            dataIndex: 'has_qualite_systeme_gestion',
            hidden: true
            
        }, {
            text: 'Elabor. Rapports ?',
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "X" : "";
            },
            dataIndex: 'has_rapports',
            hidden: true
            
        }, {
            text: 'Disp. Moyens',
            align: 'center',
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "X" : "";
            },
            dataIndex: 'has_disponibilite_moyens',
            hidden: true
            
        }, {
            text: 'Commentaires',
            dataIndex: 'comment',
            hidden: true
        }]
    }]
});