Ext.define('App.view.visit.RecommandationWizard', {
    extend: 'App.view.widgets.Wizard',
    xtype: [
        'recommandationwizard',
        'recommandationcreate',
        'recommandationedit'
    ],

    controller: {
        type: 'recommandationwizard'
    },

    /*viewModel: {
        type: 'recommandationwizard'
    },*/


    bind: {
        title: '{record.phantom? "Ajouter" : "Modifier"} Recommandation << {record.title} >>'
    },

    width: 540,

    screens: [{
        title: 'Général',
        iconCls: 'x-fa fa-info',

        defaults: {
            labelWidth: 120,
        },

        items: [{
            xtype: 'textfield',
            reference: 'titleField',
            label: 'Titre',
            bind: '{record.title}',
            
            clearable: true,
            required: true
        }, {
            xtype: 'textareafield',
            reference: 'content',
            label: 'Contenu',

            bind: '{record.content}',
            clearable: true,
            required: true
        }, {            
            xtype: 'selectfield',
            reference: 'destination',
            label: 'Destinataire',
            options: [
                'Porteur du Projet',
                'Association Gestionnaire',

                'D.A.S',
                'D.A.S / S.C',
                'D.A.S / S.F.R.C',
                'D.A.S / S. Précarité',
                'D.A.S / S.S.E',
                
                'Collectivité locale',

                'Préfecture',

                'Service Extérieur',

                'A.N.A.P.E.C',
                'C.C.A',
                'O.D.E.C.O'
            ],

            required: true,
            bind: '{record.destination}'

        }, {
            xtype: 'selectfield',
            reference: 'importance',
            label: 'Importance',

            options: [{
                text: 'Banal',
                value: 'Banal'
            },{
                text: 'Utile',
                value: 'Utile'
            }, {
                text: 'Nécessaire',
                value: 'Nécessaire'
            }, {
                text: 'Obligatoire',
                value: 'Obligatoire'
            }, {
                text: 'Crucial',
                value: 'Crucial'
            }],

            required: true,
            bind: '{record.importance}'
        }, {
            xtype: 'selectfield',
            reference: 'urgency',
            label: 'Urgence',

            options: [{
                text: '6 mois',
                value: '6 mois'
            }, {
                text: '1 mois',
                value: '1 mois'
            }, {
                text: '1 semaine',
                value: '1 semaine'
            }, {
                text: '1 jour',
                value: '1 jour'
            }],

            required: true,
            bind: '{record.urgency}'
        }, {
            xtype: 'textareafield',
            reference: 'note',
            label: 'Commentaires',

            bind: '{record.note}',
            clearable: true
        }]
    }]
});
