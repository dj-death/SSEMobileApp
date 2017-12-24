/*function getEtat(val, record){
	var etats = App.app.getMetricsEtatsStore(),
		match = etats.findRecord('value', val, 0, true);

	return match && match.get('label');
}



function getVehiculeEtat (val, record){
    var etats = App.app.getMetricsObjetsEtatsStore(),
		match = etats.findRecord('value', val, 0, true);

	return match && match.get('label');
}

function getQuality (val, record){
    var qualites = App.app.getMetricsQualitesStore(),
		match = qualites.findRecord('value', val, 0, true);

	return match && match.get('label');
}



function getUsage(val, record){
    var usages = App.app.getMetricsUsagesStore(),
		match = usages.findRecord('value', val, 0, true);

	return match && match.get('label');
}

function getSatisfy (val, record){
    var satisfactions = App.app.getMetricsSatisfactionsStore(),
		match = satisfactions.findRecord('value', val, 0, true);

	return match && match.get('label');
}

function getSufficent (val, record){
    var suffisances = App.app.getMetricsSuffisancesStore(),
		match = suffisances.findRecord('value', val, 0, true);

	return match && match.get('label');
}


*/
Ext.define('App.model.Project', {
    extend: 'App.model.Base',

    identifier: {
        type: 'sequential',
        seed: 200000
    },

    convertOnSet: false,

    fields: [
        { // as Code
            name : 'id',
            type : 'int'
        },

        //{ name: 'code', type: 'int' },
        { name: 'reference', type: 'string' },
        { name: 'intitule', type: 'string' },
        { name: 'objectifs', type: 'string' },
        { name: 'consistance', type: 'string' },        
        { name: 'commune', type: 'string' },
        { name: 'commune_sans_intercom', type: 'string' },

        { name: 'location', type: 'auto', defaultValue: {
            "latitude": null,
            "longitude": null
        }},
        
        { name: 'quartier_douar', type: 'string' },
        { 
            name: 'programme', 
            type: 'string'
        },
        { 
            name: 'rubrique', 
            type: 'string'
        },

        { name: 'est_AGR', type: 'boolean' },
        { name: 'est_projet', type: 'boolean' },
        { name: 'est_infrastructure', type: 'boolean' },
        { name: 'est_PCD', type: 'boolean' },
        { name: 'est_EPS', type: 'boolean' },

        { name: 'est_sousprojet', type: 'boolean'},
        
        { name: 'duree_projet', type: 'float' },
        { 
            name: 'type_MOA', 
            type: 'string'
        },

        { name: 'MOA', type: 'string' },

        { name: 'montant_global', type: 'float'},
        { name: 'part_INDH', type: 'float' },
        { name: 'montant_engage', type: 'float' },
        { name: 'montant_emis', type: 'float' },

        { name: 'participation_partenaires', type: 'float' },
        { name: 'contribution_beneficiaires', type: 'float' },
        { 
            name: 'part_INDH_percent', 
            type: 'float', 
            depends: ['montant_global', 'part_INDH'],

            calculate: function (data) {
                var percent = data.part_INDH / data.montant_global;

                if (isNaN(percent)) {
                    return 0;
                }

                return Ext.Number.correctFloat(percent);
            },
            
            // It's the same array. But we need Model#set to see it as modified so it
            // is flushed to the UI
            isEqual: function() {
                return false;
            }
        },

        { name: 'tx_avancement_physique', type: 'float' },
        { name: 'tx_avancement_financier', type: 'float' },

        { 
            name: 'statut', 
            type: 'string'/*,
            convert: function (id, record){
                var statuts = App.app.getINDHStatutsStore(),
                    match = statuts.findRecord('value', id, 0, true);

                return match && match.get('label');
            }*/
        },

        { name: 'observation_statut', type: 'string' },

        { name: 'motif_souffrance', type: 'string' },

        { name: 'porteur', type: 'string' },
        { name: 'type_porteur', type: 'string' },
        { 
            name: 'classe_porteur', 
            type: 'string'
        },
        { name: 'classe_partenaire', type: 'string' },
                
        { name: 'capacite_accueil', type: 'int' },

        { name: 'pop_benef_total_prevu', type: 'int' },
        { name: 'pop_benef_homme_prevu', type: 'int' },
        { name: 'pop_benef_femme_prevu', type: 'int' },
        { name: 'pop_benef_jeune_prevu', type: 'int' },
        { name: 'pop_benef_menage_prevu', type: 'int' },

        { name: 'pop_benef_total_reel', type: 'int' },
        { name: 'pop_benef_homme_reel', type: 'int' },
        { name: 'pop_benef_femme_reel', type: 'int' },
        { name: 'pop_benef_jeune_reel', type: 'int' },
        
        { 
            name: 'secteur_activite', 
            type: 'string'
        },

        { 
            name: 'secteur_activite_principal', 
            type: 'string'
        },
        
        { name: 'validation_reunion_CPDH', type: 'string' },
        { name: 'date_reunion_CPDH', type: 'date', dateFormat: 'C'},
        { name: 'Date de convention', type: 'date', dateFormat: 'C'},
        { name: 'date_validation_convention', type: 'date', dateFormat: 'C'},
        { name: 'date_lancement', type: 'date', dateFormat: 'C'},
        { name: 'date_execution', type: 'date', dateFormat: 'C'},
        { name: 'date_emission', type: 'date', dateFormat: 'C'},
        { name: "date_achevement_probable", type: 'date', dateFormat: 'C'},

        { name: "date_visite_royale", type: 'date', dateFormat: 'C'},
        { name: 'objet_visite_royale', type: 'string'},


        { name: 'date_ouverture_plis', type: 'date', dateFormat: 'C'},
        { name: 'date_implantation', type: 'date', dateFormat: 'C'},
        { name: 'date_arret_travaux', type: 'date', dateFormat: 'C'},
        { name: 'date_reprise_travaux', type: 'date', dateFormat: 'C'},
        { name: 'date_reception_provisoire', type: 'date', dateFormat: 'C'},
        { name: 'date_reception_definitive', type: 'date', dateFormat: 'C'},

        { name: 'images', type: 'auto', defaultValue: [] },
        { name: 'convention', type: 'string'},


        { name: 'comment', type: 'string'},
        { name: 'product_id', reference: 'Product' },
        { name: 'parent_id', reference: 'Project' },

        {
            name: 'statutCls',
            persist: false,
            depends: ['statut'],
            
            calculate: function (data) {
                var statut = data.statut;
    
                statut = statut && statut.toLowerCase().trim();
    
                switch (statut) {
                    case 'non démarré':
                        return 0;
                        
                    case 'non initié':
                    case 'en cours d\'étude':
                        return 1;
                        
                    case 'en cours de lancement':
                        return 2;
    
                    case 'en cours d\'execution':
                    case 'en cours d\'exécution':
                        return 3;
    
                    case 'en retard d\'exécution':
                        return 4;
    
                    case 'achevé (considéré non opérationnel)':
                        return 5;
    
                    case 'opérationnel':
                        return 6;
    
                    case 'en difficulté':
                        return 7;
    
        
                    case 'en arrêt':
                    case 'en arrêt d\'activité':
                    case 'en souffrance':
                    case 'projet mort':
                        return 8;
    
                    
                    case 'en cours d\'annulation':
                    case 'en cours de résiliation':
                    case 'résilié':
                        return 9;
    
                    case 'annulé':
                        return 10;
    
                    default:
                        console.log('Statut non identifié :', statut);
                        return;
                }
            }
        }

        

    ],

    proxy: {
        api: {
            prefix: 'Server.projects'
        }
    }
});