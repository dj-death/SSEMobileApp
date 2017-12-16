Ext.define('App.view.tablet.product.Browse', {
    extend: 'App.view.product.Browse',
    // xtype: 'productbrowse', -- set by profile

    requires: [
        'Ext.plugin.ListPaging',
        'Ext.grid.plugin.ViewOptions'
    ],

    controller: 'tablet-productbrowse',

    tbar: {
        xtype: 'productbrowsetoolbar'
    },


    bind: {
        title: 'Liste des Produits - {count} Produits affichés',
    },

    items: [{
        xtype: 'grid',
        reference: 'productsList',
        emptyText: 'Aucun produit correspondant à votre recherche',
        bind: '{products}',
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

        itemConfig: {
            viewModel: {
                type: 'projectbrowse-rowViewModel'
            }
        },

        listeners: {
            childdoubletap: 'onChildActivate'
        },

        grouped: true,
        groupHeader: {
            tpl: '{name} ({count} Produits)'
        },

        columnLines: true,
        rowLines: true,
        
        loadMask: true,

        multiColumnSort: false,

        selectable: {
            disabled: true
        },

        columns: [{
            text: 'Nom',
            dataIndex: 'name',

            groupable: false,
            hideable: false,

            align: 'left',
            locked: true,
            minWidth: 300,


            cell: {
                encodeHtml: false,
                cls: 'intitule-cell',
                bind: {
                    bodyCls: 'statut-icon {statutCls:pick("non-demarre", "etude", "lancement","execution", "retard", "acheve", "operationnel", "difficulte", "arret", "resilie", "annule")}'
                }
            },

            tpl: '<a class="item-title" href="#{url}">{name}</a>'
        },
        {
            text: 'Localisation',
            dataIndex: 'commune',
            align: 'center',
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<div class="item-title">{commune}, {quartier_douar}</div>',
                '<div class="item-caption">{address}</div>',
                '<div class="item-info">{email}</div>',
                '<div class="item-info"><span class="x-fa fa-phone"></span> {phone}</div>'
            ]
        }, {
            text: 'Type',
            dataIndex: 'type',
            hidden: true
        }, {
            text: 'Secteur',
            dataIndex: 'secteur_activite',
            groupable: true,
            align: 'left',
            cell: {
                encodeHtml: false
            },

            tpl: [
                '<div class="item-title">{secteur_activite}</div>',
                '<div class="item-caption">{secteur_activite_principal}</div>'
            ]
        }, {
            text: 'Secteur activite principal',
            dataIndex: 'secteur_activite_principal',
            hidden: true
        }, {
            text: 'Type d\'AGR',
            dataIndex: 'type_AGR',
            hidden: true
        }, {
            xtype: 'datecolumn',
            text: 'Date de Création',
            dataIndex: 'date_creation',
            align: 'center',
            exportStyle: {
                format: 'Short Date'
            },
            
            format: 'd/m/Y' 
        }, {
            text: 'Consistance',
            dataIndex: 'consistance',
            hidden: true
        }, {
            text: 'Statut',
            dataIndex: 'statut'
        },
        {
            text: 'Bénéficiaires réels',
            dataIndex: 'pop_benef_total_reel',
            align: 'center',
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<div class="item-title">{pop_benef_total_reel} / {capacite_accueil}</div>',
                '<div class="item-info"><span class="x-fa fa-female "></span> {pop_benef_femme_reel} &nbsp;&nbsp;&nbsp;<span class="x-fa fa-male"></span> {pop_benef_homme_reel}</div>',
                '<div class="item-info"><span class="x-fa fa-child"></span> {pop_benef_jeune_reel} &nbsp;&nbsp;&nbsp;<span class="x-fa fa-home"></span> {pop_benef_menage_reel}</div>'
            ]
        }, {
            xtype: 'numbercolumn',
            text: 'Capacité d\'accueil',
            dataIndex: 'capacite_accueil',
            format: '0',
            align: 'center',
            hidden: true
        }, {
            text: 'Gestionnaire',
            dataIndex: 'partner.name',
            align: 'center',
            width: 200,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<div class="item-caption">{director}</div>',
                '<tpl for="partner">',
                    '<a class="item-title" href="#partner/{id}">{name}</a>',
                    '<div class="item-info"><span class="x-fa fa-phone"></span> {phone}</div>',
                '</tpl>'
            ]
        },
        {
            text: 'Activités du Gestionnaire',
            dataIndex: 'activite1_gestionnaire',
            align: 'center',
            cell: {
                encodeHtml: false
            },

            hidden: true,

            tpl: [
                '<div class="item-caption">{activite1_gestionnaire}</div>',
                '<div class="item-caption">{activite2_gestionnaire}</div>',
                '<div class="item-caption">{activite3_gestionnaire}</div>'
            ]
        },
        {
            text: 'Nb. de Projets',
            dataIndex: 'projectscount',
            align: 'center',
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<a href="#projects/product/{id}">',
                    '{projectscount:plural("projet")}',
                '</a>'
            ]
        }, {
            text: 'Montant global',
            dataIndex: 'montant_global',
            xtype: 'numbercolumn'
        }, {
            text: 'Part INDH',
            dataIndex: 'part_INDH',
            xtype: 'numbercolumn'
        }, {
            text: 'Encadrement',
            dataIndex: 'staff',
            hidden: true
        }, {
            text: 'Tarif',
            xtype: 'numbercolumn',
            dataIndex: 'tarif_moyen',
            hidden: true
        }, {
            text: 'Comment. /Tarif',
            dataIndex: 'tarifs_comment',
            hidden: true
        }, {
            text: 'Total Emplois permanents',
            hidden: true,
            dataIndex: 'emplois_permanents_total',
            xtype: 'numbercolumn'
        }, {
            text: 'Total Emplois occasionnels',
            hidden: true,
            dataIndex: 'emplois_occasionnels_total',
            xtype: 'numbercolumn'
        }, {
            text: 'Total Emplois crées',
            hidden: true,
            dataIndex: 'emplois_crees',
            xtype: 'numbercolumn'
        }, {
            text: 'Pérennité',
            dataIndex: 'niveau_perennite',
            hidden: true
        }, {
            text: 'Commentaire',
            dataIndex: 'comment',
            hidden: true
        }, {
            text: 'Nb. de Visites',
            dataIndex: 'visitscount',
            align: 'center',

            cell: {
                encodeHtml: false
            },
            tpl: [
                '<a href="#visits/product/{id}">',
                    '{visitscount:plural("visite")}',
                '</a>'
            ]
        }]
    }]
});