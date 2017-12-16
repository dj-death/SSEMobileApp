Ext.define('App.view.tablet.project.Browse', {
    extend: 'App.view.project.Browse',
    // xtype: 'projectbrowse', -- set by profile

    requires: [
        'Ext.plugin.ListPaging',

        'Ext.grid.plugin.ViewOptions',
        'Ext.grid.plugin.ColumnResizing',
        'Ext.grid.plugin.MultiSelection',
        'Ext.grid.plugin.RowExpander',
        'Ext.grid.plugin.RowOperations',
        
        'Ext.Template'
    ],

    controller: 'tablet-projectbrowse',


    bind: {
        title: 'Liste des Projets INDH de la Préfecture de Meknès - {count} Projets affichés',
    },

    tbar: {
        xtype: 'projectbrowsetoolbar'
    },

    layout: 'fit',

    items: [{
        xtype: 'grid',
        reference: 'projectsList',

        emptyText: 'Aucun projet correspondant à votre recherche',
        loadingText: "Chargement...",

        bind: '{projects}',

        ui: 'listing',

        syncRowHeight: false,

        grouped: true,
        groupHeader: {
            tpl: '{name} ({count} Projets)'
        },


        plugins: {
            listpaging: {
                autoPaging: true
            },

            gridviewoptions: true,

            rowoperations: {
                // This config replaces the default "Delete" button
                // provided by the plugin.
                operation: {
                    text: 'Opérations',
                    ui: 'alt',

                    menu: [{
                        text: 'Regrouper en Produit',
                        iconCls: 'x-fa fa-archive',
                        handler: 'onGroupAsProduct'
                    }, {
                        text: 'Supprimer',
                        iconCls: 'x-fa fa-trash',
                        handler: 'onDelete'
                    }]
                }
            }
        },

        itemConfig: {
            viewModel: {
                type: 'projectbrowse-rowViewModel'
            }
        },

        columnLines: true,
        rowLines: true,
        
        loadMask: true,

        multiColumnSort: false,

        selectable: {
            disabled: true
        },


        toolContextMenu: { // used by Controller
            xtype: 'menu',
            anchor: true,
            padding: 10,
            minWidth: 180,
            viewModel: {},

            items: [{
                xtype: 'component',
                html: '<b>Accèder à ce Projet dans le SI-INDH</b>',
            }, {
                text: 'Fiche S3',
                handler: 'goToS3',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fa-pencil-square-o'
            }, {
                text: 'Impacts environ.',
                handler: 'goToS3_impacts',
                margin: '10 0 0',
                iconCls: 'x-fa fa-envira'
            }, {
                text: 'Partenaires',
                handler: 'goToS3_partenaires',
                margin: '10 0 0',
                iconCls: 'x-fa fa-users'
            }, {
                text: 'Fiche Suivi',
                handler: 'goToS3_suivi',
                margin: '10 0 0',
                iconCls: 'x-fa fa-file-word-o'
            }, {
                text: 'Prestations',
                handler: 'goToS3_prestations',
                margin: '10 0 0',
                iconCls: 'x-fa fa-balance-scale '
            }, {
                text: 'Realisations',
                handler: 'goToS3_realisations',
                margin: '10 0 0',
                iconCls: 'x-fa fa-signal'
            }, {
                text: 'Bénéficiaires',
                handler: 'goToS3_benefs',
                margin: '10 0 0',
                iconCls: 'x-fa fa-child'
            }, {
                text: 'Indicateurs',
                handler: 'goToS3_indicateurs',
                margin: '10 0 0',
                iconCls: 'x-fa fa-tachometer '
            }, {
                text: 'Post-création',
                handler: 'goToS3_postcreation',
                margin: '10 0 0',
                iconCls: 'x-fa fa-eye'
            }, {
                text: 'Fiche PDF',
                handler: 'getFichePDF',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fa-file-pdf-o'
            }, {
                text: 'Formulaire Suivi',
                handler: 'getFormulaireSuivi',
                margin: '10 0 0',
                iconCls: 'x-fa fa-check-square-o'
            }]
        },

        columns: [{
            width: 40,
            cell: {
                tools: {
                    menu: 'onProjectMenu'
                }
            }

        }, {
            text: 'Code',
            hidden: true,
            dataIndex: 'id'
        }, {
            text: 'Référence',
            hidden: true,
            dataIndex: 'reference'
        }, {
            text: 'Statut',
            dataIndex: 'statut',
            width: 45,

            cell: {
                encodeHtml: false,
                cls: 'statut-cell',
                bind: {
                    bodyCls: 'statut-icon {statutCls:pick("non-demarre", "etude", "lancement","execution", "retard", "acheve", "operationnel", "difficulte", "arret", "resilie", "annule")}'
                }
            },

            tpl: ''


        }, {
            text: 'Intitulé',
            dataIndex: 'intitule',
            //cellWrap: true,
            groupable: false,
            hideable: false,

            align: 'left',
            locked: true,
            minWidth: 600,

            cell: {
                encodeHtml: false,
                cls: 'intitule-cell',
                bind: {
                    bodyCls: 'statut-icon {statutCls:pick("non-demarre", "etude", "lancement","execution", "retard", "acheve", "operationnel", "difficulte", "arret", "resilie", "annule")}'
                }
            },


            tpl: [
                /*'<tpl for="parent">',
                    '{intitule}<hr/>',
                '</tpl>',*/

                '<a class="item-title" href="#{url}"><tpl if="est_sousprojet"> ======> </tpl>{intitule}</a>'
    
            ]

        }, {
            text: 'Phase INDH',
            hidden: true,
            dataIndex: 'phase_INDH'
        }, {
            text: 'Année',
            dataIndex: 'annee',
            width: 60
        },{
            text: 'Programme',
            dataIndex: 'programme',
            width: 80
        }, {
            text: 'Rubrique',
            hidden: true,
            dataIndex: 'rubrique'
        }, {
            text: 'Commune',
            dataIndex: 'commune'       
        }, {
            text: 'Quartier/Douar',
            dataIndex: 'quartier_douar'
        }, {
            text: 'Produit',
            dataIndex: 'product_id',
            align: 'center',
            width: 100,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<tpl for="product">',
                    '<a class="item-title" href="#product/{id}">{name}</a>',
                '</tpl>'
            ]
        }, {
            text: 'Montant global',
            hidden: true,
            dataIndex: 'montant_global',
            xtype: 'numbercolumn',

            exportStyle: {
                format: 'General Number',
                alignment: {
                    horizontal: 'Right'
                }
            }
        }, {
            text: 'Part INDH',
            hidden: true,
            dataIndex: 'part_INDH',
            xtype: 'numbercolumn',

            exportStyle: {
                format: 'General Number',
                alignment: {
                    horizontal: 'Right'
                }
            }
        }, {
            text: '% Part INDH',
            hidden: true,
            dataIndex: 'part_INDH_percent',
            formatter: 'percent'
        }, {
            text: 'Montant engagé',
            hidden: true,
            dataIndex: 'montant_engage',
            xtype: 'numbercolumn',

            exportStyle: {
                format: 'General Number',
                alignment: {
                    horizontal: 'Right'
                }
            }
        }, {
            text: 'Montant émis',
            hidden: true,
            dataIndex: 'montant_emis',
            xtype: 'numbercolumn',

            exportStyle: {
                format: 'General Number',
                alignment: {
                    horizontal: 'Right'
                }
            }
        },{
            text: 'Classe Partenaire',
            dataIndex: 'classe_partenaire',
            hidden: true
        }, {
            text: 'Participation partenaires',
            hidden: true,
            dataIndex: 'participation_partenaires',
            xtype: 'numbercolumn',

            exportStyle: {
                format: 'General Number',
                alignment: {
                    horizontal: 'Right'
                }
            }
        }, {
            text: 'Contribution des bénéficiaires',
            hidden: true,
            dataIndex: 'contribution_beneficiaires',
            xtype: 'numbercolumn',
            
            exportStyle: {
                format: 'General Number',
                alignment: {
                    horizontal: 'Right'
                }
            }
        }, {
            text: 'Secteur',
            dataIndex: 'secteur_activite_principal',
            //cellWrap: true,
            groupable: true,
            hideable: true,
            align: 'left',
            //locked: true,

            minWidth: 200,
            cell: {
                encodeHtml: false
            },

            tpl: [
                '<div class="item-title">{secteur_activite}</div>',
                '<div class="item-caption">{secteur_activite_principal}</div>'
            ]

        }, {
            text: 'Secteur d\'activité',
            hidden: true,
            dataIndex: 'secteur_activite'
        }, {
            text: 'Catégorie',
            hidden: true,
            dataIndex: 'categorie'
        }, {
            text: 'AGR ?',
            dataIndex: 'est_AGR',
            hidden: true,
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "Oui" : "";
            },
            exportRenderer: true,
            align: 'center'
        }, {
            text: 'Projet ?',
            dataIndex: 'est_projet',
            hidden: true,
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "Oui" : "";
            },
            exportRenderer: true,
            align: 'center'
            
        }, {
            text: 'Infrastructure ?',
            dataIndex: 'est_infrastructure',
            hidden: true,
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "Oui" : "";
            },
            exportRenderer: true,
            align: 'center'
        }, {
            text: 'PCD ?',
            dataIndex: 'est_PCD',
            hidden: true,
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "Oui" : "";
            },
            exportRenderer: true,
            align: 'center'
           
        }, {
            text: 'EPS ?',
            dataIndex: 'est_EPS',
            hidden: true,
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "Oui" : "";
            },
            exportRenderer: true,
            align: 'center'
            
        }, {
            text: 'Porteur du projet',
            dataIndex: 'porteur',
            //cellWrap: true,
            groupable: true,
            hideable: true,
            align: 'center',
            //locked: true,
            minWidth: 150,

            cell: {
                encodeHtml: false
            },

            tpl: '<a class="item-title" href="#projects/partner/{id}">{porteur}</a>'

        }, {
            text: 'Type Porteur',
            dataIndex: 'type_porteur',
            hidden: true
        }, {
            text: 'Classe Porteur',
            dataIndex: 'classe_porteur',
            hidden: true
        }, {
            text: 'MOA',
            dataIndex: 'MOA'
        }, {
            text: 'Taux d\'avancement physique',
            hidden: true,
            dataIndex: 'tx_avancement_physique',
            xtype: 'numbercolumn'
        }, {
            text: 'Taux d\'avancement financier',
            hidden: true,
            dataIndex: 'tx_avancement_financier',
            xtype: 'numbercolumn'
        }, {
            text: 'Statut',
            hidden: true,
            dataIndex: 'statut'
        }, {
            text: 'Observations / Statut actuel',
            hidden: true,
            dataIndex: 'observation_statut'
        }, {
            text: 'En souffrance',
            hidden: true,
            dataIndex: 'en_souffrance',
            renderer: function (value, record, dataIndex, cell, column) {
                return value ? "Oui" : "";
            },
            exportRenderer: true,
            align: 'center',
        }, {
            text: 'Motif de souffrance',
            hidden: true,
            dataIndex: 'motif_souffrance'
        }, {
            text: 'Mesures de relance',
            hidden: true,
            dataIndex: 'mesures_relance'
        }, {
            text: 'Responsable relance',
            hidden: true,
            dataIndex: 'responsable_relance'
        }, {
            text: 'Planning de relance',
            hidden: true,
            dataIndex: 'planning_relance'
        }, {
            text: 'Comment.',
            hidden: true,
            dataIndex: 'comment'
        }, {
            text: 'Bénéficiaires prévus',
            dataIndex: 'pop_benef_total_prevu',
            hidden: true,

            align: 'center',
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<div class="item-title">{pop_benef_total_prevu} / {capacite_accueil}</div>',
                '<div class="item-info"><span class="x-fa fa-female "></span> {pop_benef_femme_prevu} &nbsp;&nbsp;&nbsp;<span class="x-fa fa-male"></span> {pop_benef_homme_prevu}</div>',
                '<div class="item-info"><span class="x-fa fa-child"></span> {pop_benef_jeune_prevu} &nbsp;&nbsp;&nbsp;<span class="x-fa fa-home"></span> {pop_benef_menage_prevu}</div>'
            ]
        }, {
            text: 'Capacite d\'accueil',
            hidden: true,
            dataIndex: 'capacite_accueil',
            xtype: 'numbercolumn',
            format:'0'
        }, {
            text: 'Nb. Femmes bénéficiaires prévus',
            hidden: true,
            dataIndex: 'pop_benef_femme_prevu',
            xtype: 'numbercolumn',
            format:'0'
        }, {
            text: 'Nb. Hommes bénéficiaires prévus',
            hidden: true,
            dataIndex: 'pop_benef_homme_prevu prévus',
            xtype: 'numbercolumn',
            format:'0'
        }, {
            text: 'Nb. Jeunes bénéficiaires prévus',
            hidden: true,
            dataIndex: 'pop_benef_jeune_prevu',
            xtype: 'numbercolumn',
            format:'0'
        }, {
            text: 'Nb. Ménages bénéficiaires prévus',
            hidden: true,
            dataIndex: 'pop_benef_menage_prevu',
            xtype: 'numbercolumn',
            format:'0'
        }, {
            text: 'Total Emplois permanents',
            hidden: true,
            dataIndex: 'emplois_permanents_total',
            xtype: 'numbercolumn',

            exportStyle: {
                format: 'General Number',
                alignment: {
                    horizontal: 'Right'
                }
            }
        }, {
            text: 'Total Emplois occasionnels',
            hidden: true,
            dataIndex: 'emplois_occasionnels_total',
            xtype: 'numbercolumn',

            exportStyle: {
                format: 'General Number',
                alignment: {
                    horizontal: 'Right'
                }
            }
        }, {
            text: 'Total Emplois crées',
            hidden: true,
            dataIndex: 'emplois_crees',
            xtype: 'numbercolumn',

            exportStyle: {
                format: 'General Number',
                alignment: {
                    horizontal: 'Right'
                }
            }
        }]
    }]
});