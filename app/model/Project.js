function getEtat(val, record){
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



Ext.define('App.model.Project', {
    extend: 'App.model.Base',

    requires: [
        'App.store.INDH.Rubriques',
        'App.store.INDH.Programmes'
    ],

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
        { name: 'code_projet_pere', type: 'int' },

        { name: 'intitule', type: 'string' },

        { name: 'objectifs', type: 'string' },
        { name: 'consistance', type: 'string' },

        //{ name: 'numero', type: 'int' },
        
        { name: 'commune', type: 'string' },
        { name: 'commune_sans_intercom', type: 'string' },
        
        { name: 'quartier_douar', type: 'string' },
        { 
            name: 'nature_commune', 
            type: 'string',

            convert: function (id, record){
                switch (id) {
                    case 1:
                        return "Commune rurale";

                    case 2:
                        return "Commune urbaine";

                    case 3:
                        return "Intercommunal";

                    default:
                        return null;
                }
            }
        },
        
        { 
            name: 'phase_INDH', 
            type: 'string',
            convert: function (val, record){
                return "Phase " + val;
            }
        },
        { 
            name: 'origine', 
            type: 'string'/*,

            convert: function (id, record){
                switch (id) {
                    case 1:
                        return "ILDH";

                    case 2:
                        return "Appel à projet";

                    case 3:
                        return "SRLCP";

                    default:
                        return null;
                }
            }*/
        },

        { 
            name: 'programme', 
            type: 'string'/*,
            convert: function (progId, record){
                var programmes = App.app.getINDHProgrammesStore(),
                    match = programmes.findRecord('value', progId, 0, true);

                return match && match.get('label');
            }*/
        },
        { 
            name: 'rubrique', 
            type: 'string'/*,
            convert: function (id, record){
                var rubriques = App.app.getINDHRubriquesStore(),
                    match = rubriques.findRecord('value', id, 0, true);

                return match && match.get('label');
            }*/
        },

        { name: 'type_AGR', type: 'string' },
        { name: 'rubrique_AGR', type: 'string' },

        { name: 'est_AGR', type: 'boolean' },
        { name: 'est_projet', type: 'boolean' },
        { name: 'est_infrastructure', type: 'boolean' },
        { name: 'est_PCD', type: 'boolean' },
        { name: 'est_EPS', type: 'boolean' },

        { name: 'est_sousprojet', type: 'boolean'},
        
        { name: 'duree_projet', type: 'float' },
        { 
            name: 'type_MOA', 
            type: 'string'/*,

            convert: function (val, record){
                switch (val) {
                    case 1:
                        return 'Province';

                    case 2:
                        return 'Commune/Arrondissement';

                    case 3:
                        return 'Services déconcentrés de l\'Etat';

                    case 4:
                        return 'Associations';

                    case 5:
                        return 'Coopératives';

                    case 6:
                        return 'Sociètés Privées';

                    default: 
                        return val;
                }
                
            }*/
        },

        { name: 'MOA', type: 'string' },
        { name: 'MOA_deleg', type: 'string' },
        { name: 'coop_internationale', type: 'string' },

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

        { name: 'mesures_relance', type: 'string' },
        { name: 'responsable_relance', type: 'string' },
        { name: 'planning_relance', type: 'string' },

        { 
            name: 'en_souffrance', 
            type: 'boolean',
            persist: true,

            calculate: function (data) {
                var statut = data.statut;

                switch (statut) {
                    case 'Non démarré':
                    case 'En retard d\'exécution':
                    case 'En arrêt':
                    case 'En arrêt d\'activité':
                    case 'Achevé (considéré non opérationnel)':
                        return true;

                    default:
                        return false;
                }
            },
            
            // It's the same array. But we need Model#set to see it as modified so it
            // is flushed to the UI
            isEqual: function() {
                return false;
            }
        },

        { 
            name: 'en_cours', 
            type: 'boolean',
            persist: true,

            calculate: function (data) {
                var statut = data.statut;

                switch (statut) {
                    case 'Non initié':
                    case 'En cours de lancement':
                    case 'En cours d\'exécution':
                        return true;

                    default:
                        return false;
                }
            },
            
            // It's the same array. But we need Model#set to see it as modified so it
            // is flushed to the UI
            isEqual: function() {
                return false;
            }
        },

        { name: 'porteur', type: 'string' },
        { name: 'type_porteur', type: 'string' },
        { 
            name: 'classe_porteur', 
            type: 'string'/*,

            convert: function (val, record){
                switch (val) {
                    case 1:
                        return 'Associations';

                    case 2:
                        return 'Collectivités locales';

                    case 3:
                        return 'Coopératives';

                    case 4:
                        return 'Opérateurs privés';

                    case 5:
                        return 'Organisations';

                    case 6:
                        return 'Services déconcentrés de l\'Etat';

                    case 7:
                        return 'Bénéficiaires';

                    default: 
                        return "XXXXX" + val ;
                }
                
            }*/

            
        },
        { name: 'classe_partenaire', type: 'string' },

        /*{ name: 'theme_formation', type: 'string' },
        { name: 'theme_communication', type: 'string' },*/

        { name: 'service_technique', type: 'string' },
        
        
        { name: 'capacite_accueil', type: 'int' },

        { name: 'pop_benef_total_prevu', type: 'int' },
        { name: 'pop_benef_homme_prevu', type: 'int' },
        { name: 'pop_benef_femme_prevu', type: 'int' },
        { name: 'pop_benef_jeune_prevu', type: 'int' },
        { name: 'pop_benef_menage_prevu', type: 'int' },

        {	name: 'est_issu_DP', 
            type: 'boolean'
        },

        {	name: 'est_valide', 
            type: 'boolean'
        },

        {	name: 'est_eligible', 
            type: 'boolean'
        },

        
        { name: 'est_en_activite',  type: 'boolean' },
        { name: 'has_problemes_fonctionnement',  type: 'boolean' },
        { name: 'problemes_fonctionnement',  type: 'string' },

        { name: 'emplois_permanents_total', type: 'int' },
        { name: 'emplois_permanents_homme', type: 'int' },
        { name: 'emplois_permanents_femme', type: 'int' },
        { name: 'emplois_permanents_jeune', type: 'int' },


        { name: 'emplois_occasionnels_total', type: 'int' },
        { name: 'emplois_occasionnels_homme', type: 'int' },
        { name: 'emplois_occasionnels_femme', type: 'int' },
        { name: 'emplois_occasionnels_jeune', type: 'int' },

        { name: 'pop_benef_total_reel', type: 'int' },
        { name: 'pop_benef_homme_reel', type: 'int' },
        { name: 'pop_benef_femme_reel', type: 'int' },
        { name: 'pop_benef_jeune_reel', type: 'int' },
        
        { 
            name: 'emplois_crees_total', 
            type: 'int',
            depends: ['emplois_permanents_total', 'emplois_occasionnels_total'],

            calculate: function (data) {
                var total = 0;

                if (!isNaN(data.emplois_permanents_total)) {
                    total += data.emplois_permanents_total;
                }

                if (!isNaN(data.emplois_occasionnels_total)) {
                    total += data.emplois_occasionnels_total;
                }

                return total;
            },
            
            // It's the same array. But we need Model#set to see it as modified so it
            // is flushed to the UI
            isEqual: function() {
                return false;
            }
        },

        /*{ name: 'nombre_projet_action', type: 'int' },
        { name: 'nombre_projet', type: 'int' },

        { name: 'nombre_action', type: 'int' },
        { name: 'nombre_projet1', type: 'int' },
        { name: 'nombre_action1', type: 'int' },
        { name: 'nombre_unite', type: 'int' },
        { name: 'nombre_projet2', type: 'int' },
        { name: 'nombre_action2', type: 'int' },*/

        { 
            name: 'secteur_activite', 
            type: 'string'/*,
            convert: function (id, record){
                var soussecteurs = App.app.getINDHSousSecteursStore(),
                    match = soussecteurs.findRecord('value', id, 0, true);

                return match && match.get('label');
            }*/
        },

        { 
            name: 'secteur_activite_principal', 
            type: 'string'/*,
            convert: function (id, record){
                var secteurs = App.app.getINDHSecteursStore(),
                    match = secteurs.findRecord('value', id, 0, true);

                return match && match.get('label');
            }*/
        },

        { name: 'sous_secteur', type: 'string' },
        
        { name: 'categorie', type: 'string' },

        { name: 'type', type: 'string'},

        { name: 'appreciation_CPDH', type: 'string' },        

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
        
        { name: 'assoc_gestionnaire', type: 'string' },
        { name: 'activites_assoc_gestionnaire', type: 'string' },

        { name: 'images', type: 'auto', defaultValue: [] },
        { name: 'convention', type: 'string'},


        { name: 'comment', type: 'string'},
        { name: 'product_id', reference: 'Product' },
        { name: 'parent_id', reference: 'Project' },

        { 
            name: 'situation_realisations',
            type: 'string',

            convert: function (val, record){
                switch (val) {
                    case 1:
                        return 'En cours';
            
                    case 2:
                        return 'Opérationnel';
            
                    case 3:
                        return 'En difficulté';
            
                    default:
                        return val;
                }
            }
        
        },
        
        { name: 'pop_benef_total_reel', type: 'int' },
        { name: 'pop_benef_homme_reel', type: 'int' },
        { name: 'pop_benef_femme_reel', type: 'int' },
        { name: 'pop_benef_jeune_reel', type: 'int' },

        { name: 'has_benef_cibles', type: 'auto' },
        { name: 'comment_benefs', type: 'string' },

        {	name: 'est_fonctionnel',  type: 'auto' },
        {	name: 'has_maintenance',  type: 'auto' },
        {	name: 'has_visibilite',  type: 'auto' },
        {	name: 'has_etudes',  type: 'auto' },
        {	name: 'has_assiette_fonciere_apuree',  type: 'auto' },

        {	name: 'has_respect_circuit_approbation',  type: 'auto' },
        {	name: 'has_usage_grille_notation',  type: 'auto' },
        {	name: 'has_avis_service_technique',  type: 'auto' },
        {	name: 'has_respect_montage_initial',  type: 'auto' },

        { name: 'type_centre', type: 'string' },

        { 
            name: 'etat_batiment', 
            type: 'string',
            convert: getEtat
        },
        { 
            name: 'etat_etancheite', 
            type: 'string',
            convert: getEtat
        },
        { 
            name: 'etat_plomberie', 
            type: 'string',
            convert: getEtat
        },
        { 
            name: 'etat_equipements', 
            type: 'string',
            convert: getEtat
        },
        { 
            name: 'qualite_hygiene', 
            type: 'string',
            convert: getSatisfy
        },
        { 
            name: 'securite_centre',
            type: 'string',
            convert: getSatisfy
        },

        { 
            name: 'etat_personnel_encadrement', 
            type: 'string',
            convert: getSufficent
        },

        { name: 'effectif_encadrement', type: 'int' },

        { 
            name: 'ressources_financieres', 
            type: 'string',
            convert: getSufficent
        },

        { 
            name: 'etat_capacite_accueil', 
            type: 'string',
            convert: getSatisfy
        },

        { name: 'has_eau',  type: 'auto' },
        { name: 'has_electricite',  type: 'auto' },
        { name: 'has_assainissement',  type: 'auto' },
        { name: 'has_accessibilite',  type: 'auto' },
        { name: 'has_registre_beneficiaires',  type: 'auto' },
        { name: 'has_espaces_repos',  type: 'auto' },

        { 
            name: 'etat_installation', 
            type: 'string',
            convert: getQuality
        },

        { 
            name: 'qualite_travaux', 
            type: 'string',
            convert: getEtat
        },

        { name: 'has_mesures_maintenance',  type: 'auto' },
        { 
            name: 'desserte',
            type: 'string',
            convert: getSatisfy
        },

        { 
            name: 'etat_vehicule',
            type: 'string',
            convert: getVehiculeEtat
        },
        { name: 'has_carnet_bord',  type: 'auto' },
        { name: 'has_registre_evacuation',  type: 'auto' },
        { name: 'has_police_assurance',  type: 'auto' },

        { 
            name: 'etat_materiels',
            type: 'string',
            convert: getVehiculeEtat
        },

        { 
            name: 'utilisation_equipements',
            type: 'string',
            convert: getUsage
        },

        { 
            name: 'qualite_prestations',
            type: 'string',
            convert: getSatisfy
        },
        { 
            name: 'tarification',
            type: 'string',
            convert: function (val, record){
                switch (val) {
                    case 0:
                        return 'Gratuits';
            
                    case 1:
                        return 'Payants';
        
                    default:
                        return val;
                }
            }
            
        },

        { name: 'tarif', type: 'float' },

        { name: 'taux_utilisation', type: 'float' },


        { name: 'age', type: 'float' },
        { name: 'est_viable',  type: 'auto' },
        { name: 'has_revenus',  type: 'auto' },
        { name: 'has_maintien_benefs_initiaux',  type: 'auto' },

        { name: 'CA_prevu', type: 'float' },
        { name: 'CA_reel', type: 'float' },
        { name: 'explication_ecart_CA', type: 'string' },

        { name: 'difficultes_rencontrees', type: 'string' },

        /*{ name: 'emplois_permanents_total', type: 'int' },
        { name: 'emplois_permanents_homme', type: 'int' },
        { name: 'emplois_permanents_femme', type: 'int' },
        { name: 'emplois_permanents_jeune', type: 'int' },

        { name: 'emplois_occasionnels_total', type: 'int' },
        { name: 'emplois_occasionnels_homme', type: 'int' },
        { name: 'emplois_occasionnels_femme', type: 'int' },
        { name: 'emplois_occasionnels_jeune', type: 'int' },*/

        { name: 'has_accompagnement',  type: 'auto' },
        
        { name: 'est_satisfait',  type: 'auto' },
        { 
            name: 'degre_satisfaction',
            type: 'string',

            convert: function (val, record){
                var degrees = App.app.getMetricsDegreesStore(),
                    match = degrees.findRecord('value', val, 0, true);
            
                return match && match.get('label');
           }
            
        },

        { name: 'problemes_projet', type: 'string' },
        { name: 'problemes_porteur', type: 'string' },

        
        {	name: 'tx_pertinence', 
            type: 'float'
        },
        {	name: 'tx_efficacite', 
            type: 'float'
        },
        {	name: 'tx_efficience', 
            type: 'float'
        },
        {	name: 'tx_durabilite', 
            type: 'float'
        },
        
        
        {	name: 'durabilite_q1_renforcement_capacites', 
            type: 'auto'
        },
        {	name: 'durabilite_q2_role_DAS_renforcement_capacites', 
            type: 'auto'
        },
        {	name: 'durabilite_q3_possibilite_paiement', 
            type: 'auto'
        },
        {	name: 'durabilite_q4_mesures_financieres_continuite', 
            type: 'auto'
        },
        {	name: 'durabilite_q5_impact_culture', 
            type: 'auto'
        },
        {	name: 'durabilite_q6_mesures_environementales', 
            type: 'auto'
        },
        {	name: 'durabilite_q7_mesures_renforcement_role_femmes', 
            type: 'auto'
        },
        
        
        {	name: 'efficacite_q1_progres_accomplis', 
            type: 'auto'
        },
        {	name: 'efficacite_q2_qualite', 
            type: 'auto'
        },
        {	name: 'efficacite_q3_resultats_continus', 
            type: 'auto'
        },
        {	name: 'efficacite_q4_favorise_actions_partenaires', 
            type: 'auto'
        },
        
        {	name: 'efficacite_q5_appreciation_benefs', 
            type: 'auto'
        },
        
        
        {	name: 'efficience_q1_modalites_meo_propices', 
            type: 'auto'
        },
        {	name: 'efficience_q2_gestion_efficace', 
            type: 'auto'
        },
        {	name: 'efficience_q3_ressources_appropriees', 
            type: 'auto'
        },
        {	name: 'efficience_q4_respect_quotesparts', 
            type: 'auto'
        },
        {	name: 'efficience_q5_disponibilite_ressources', 
            type: 'auto'
        },
        {	name: 'efficience_q6_retards_importants', 
            type: 'auto'
        },
        {	name: 'efficience_q7_revisions_plan', 
            type: 'auto'
        },
        {	name: 'efficience_q7_1_revisions_plan_efficaces', 
            type: 'auto'
        },
        {	name: 'efficience_q8_economie_realisations', 
            type: 'auto'
        },
        {	name: 'efficience_q9_suivi_adequat', 
            type: 'auto'
        },
        
        {	name: 'pertinence_q1_besoins', 
            type: 'auto'
        },
        
        {	name: 'pertinence_q2_approprie_porteur', 
            type: 'auto'
        },
        
        {	name: 'pertinence_q3_engagement', 
            type: 'auto'
        },
        
        {	name: 'pertinence_q4_coordination', 
            type: 'auto'
        },
        
        {	name: 'pertinence_q5_complementarite', 
            type: 'auto'
        },
        
        {	name: 'pertinence_q6_adaptabilite', 
            type: 'auto'
        },
        
        {	name: 'pertinence_q7_definition_kpi', 
            type: 'auto'
        },
        
        {	name: 'pertinence_q8_disponibilite_infos', 
            type: 'auto'
        },
        
        {	name: 'pertinence_q9_genderisation_kpi', 
            type: 'auto'
        },
        
        {	name: 'pertinence_q10_valeurs_references', 
            type: 'auto'
        },
        
        {	name: 'pertinence_q11_valeurs_cibles', 
            type: 'auto'
        },

        { name: 'porteur_projectscount', type: 'int', persist: false },
        { name: 'porteur_projectscount_operationnels', type: 'int', persist: false },
        { name: 'porteur_projectscount_encours', type: 'int', persist: false },
        { name: 'porteur_INDH_contributions', type: 'int', persist: false },

        { name: 'porteur_ajuste', type: 'string' },
        { name: 'MOA_ajuste', type: 'string' },
        
        {
            name: 'porteur_annees_projets',
            persist: false,
            convert: function(val, rec) {
                return Array.isArray(val) ? val.join(' ') : val;
            }
        }, {
            name: 'porteur_statuts_projets',
            persist: false,
            convert: function(val, rec) {
                return Array.isArray(val) ? val.join(' ') : val;
            }
        }

        

    ],

    proxy: {
        api: {
            prefix: 'Server.projects'
        }
    }
});