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




Ext.define('App.model.Visit', {
    extend: 'App.model.Base',

    mixins: ['Ext.calendar.model.EventBase'],
 
    requires: [
        'Ext.data.field.String',
        'Ext.data.field.Integer',
        'Ext.data.field.Date',
        'Ext.data.field.Boolean'
    ],

    statics: {
        getStatusName: function(status) {
            return this.prototype.statusNames[status];
        }
    },


    convertOnSet: false,

    fields: [
        { name: 'meta', type: 'string'},

        { name: 'motive', type: 'string' },
        { name: 'visitedSites', type: 'string' },

        { name: 'metPeople', type: 'string' },
        { name: 'observations', type: 'string' },
        { name: 'recommandations', type: 'string' },
        { name: 'risks_list', type: 'auto', defaultValue: []},

        { name: "calendarId", defaultValue: 2},
        { name: 'title', type: 'string'},
        { name: 'description', type: 'string', defaultValue: 'Visite prévue de suivi-évaluation'},
        { name: 'startDate', type: 'date', dateFormat: 'c'},
        { name: 'endDate', type: 'date', dateFormat: 'c'},
        //{ name: 'color', type: 'string', defaultValue: 'yellow', persist: false},
        { name: 'allDay', type: 'boolean'}, 
        {
            name: 'duration',
            type: 'int',
            persist: false,
            depends: ['startDate', 'endDate'],
            calculate: function(data) {
                var start = data.startDate,
                    end = data.endDate,
                    ms = 0;

                if (start === end) {
                    return 24 * 60;
                }
    
                if (end && start) {
                    ms = end.getTime() - start.getTime();
                }
                return ms / 60000;
            }
        },

        { name: 'is_done', type: 'boolean' },
        { name: 'has_report', type: 'boolean' },
        { name: 'has_notes', type: 'boolean' },

        { name: 'product_id', reference: 'Product' },
        { name: 'quartier_douar', type: 'string' },

        { name: 'mission_id', reference: 'Mission' },
        { name: 'assignee_id', reference: 'Person' },
        { name: 'modifiedBy_id', reference: 'Person' },

        { name: 'status', type: 'int'},

        { name: 'projectscount', type: 'int', persist: false },

        { 
            name: 'situation_realisations',
            type: 'string',
            defaultValue: 2,
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

        { name: 'has_benef_cibles', type: 'auto', defaultValue: true },
        { name: 'comment_benefs', type: 'string' },

        {	name: 'est_eligible',  type: 'auto', defaultValue: true },
        {	name: 'est_fonctionnel',  type: 'auto', defaultValue: true },
        {	name: 'has_maintenance',  type: 'auto', defaultValue: true },
        {	name: 'has_visibilite',  type: 'auto', defaultValue: true },
        {	name: 'has_etudes',  type: 'auto', defaultValue: true },
        {	name: 'has_assiette_fonciere_apuree',  type: 'auto' },

        {	name: 'has_respect_circuit_approbation',  type: 'auto' , defaultValue: true},
        {	name: 'has_usage_grille_notation',  type: 'auto', defaultValue: true },
        {	name: 'has_avis_service_technique',  type: 'auto', defaultValue: true },
        {	name: 'has_respect_montage_initial',  type: 'auto', defaultValue: true },

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
        
        { name: 'est_satisfait',  type: 'auto', defaultValue: true},
        { 
            name: 'degre_satisfaction',
            type: 'string',
            defaultValue: 2,

            convert: function (val, record){
                var degrees = App.app.getMetricsDegreesStore(),
                    match = degrees.findRecord('value', val, 0, true);
            
                return match && match.get('label');
           }
            
        },

        { name: 'problemes_projet', type: 'string' },
        { name: 'problemes_porteur', type: 'string' }/*,

        
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
        }*/

    ],

    getAllDay: function() {
        return this.data.duration >= 24 * 60 ? true : this.data.allDay;
    },
 
    getCalendarId: function() {        
        return this.data.calendarId;
    },
 
    getColor: function() {
        return this.data.color;
    },
 
    getDescription: function() {
        return this.data.description;
    },
 
    getDuration: function() {
        return this.data.duration;
    },

    getEndDate: function() {
        return this.data.endDate;
    },
 
    getRange: function() {
        var me = this,
            range = me.range;
 
        if (!range) {
            me.range = range = new Ext.calendar.date.Range(me.getStartDate(), me.getEndDate());
        }
        return range;
    },
 
    getStartDate: function() {
        return this.data.startDate;
    },
 
    getTitle: function() {
        if (this.data.title) {
            return this.data.title;
        }

        var product = this.getProduct();

        if (product) {
            return 'Visite de ' + product.get('name');
        }

        return 'Visite';
    },
 
    isEditable: function() {
        var calendar = this.getCalendar();
        return calendar ? calendar.isEditable() : true;
    },
 
    setAllDay: function(allDay) {
        this.set('allDay', allDay);
    },
 
    setCalendarId: function(calendarId, dirty) {
        dirty = dirty !== false;
        this.set('calendarId', calendarId, {
            dirty: dirty
        });
    },
 
    setColor: function(color) {
        this.set('color', color);
    },
 
    setData: function(data) {
        var duration = data.duration;
 
        if (duration) {
            data = Ext.apply({}, data);
            delete data.duration;
            this.setDuration(duration);
        } else if (data.startDate && data.endDate) {
            this.range = null;
        }
        this.set(data);
    },
 
    setDescription: function(description) {
        this.set('description', description);
    },
 
    setDuration: function(duration) {
        var D = Ext.Date;
        this.range = null;
        this.set('endDate', D.add(this.data.startDate, D.MINUTE, duration, true));
    },
 
    setRange: function(start, end) {
        var D = Ext.Date;
 
        if (start.isRange) {
            end = start.end;
            start = start.start;
        }
        this.range = null;
        this.set({
            startDate: D.clone(start),
            endDate: D.clone(end)
        });
    },
 
    setTitle: function(title) {
        this.set('title', title);
    },

    proxy: {
        api: {
            prefix: 'Server.visits'
        }
    }
    
});
