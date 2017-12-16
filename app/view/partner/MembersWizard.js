Ext.define('App.view.partner.MembersWizard', {
    extend: 'App.view.widgets.Wizard',
    xtype: [
        'memberswizard',
        'memberscreate',
        'membersedit'
    ],

    controller: {
        type: 'memberswizard'
    },

    bind: {
        title: '{record.phantom? "Ajouter" : "Modifier"} Membre << {record.firstname} {record.lastname} >>'
    },

    width: 600,

    screens: [{
        title: 'Identification',

        items: [{
            xtype: 'selectfield',
            label: 'Fonction',

            options: [
                'Président',
                'Vice-Président',
                'Secrétaire',
                'Vice-Secrétaire',
                'Trésorier',
                'Vice-Trésorier',
                'Conseiller',
                'Membre ordinaire'
            ],
            required: true,            
            bind: '{record.title}'

        }, {
            xtype: 'textfield',
            label: 'CIN',
            required: true,
            bind: '{record.CIN}'
        }, {
            xtype: 'textfield',
            label: 'Prénom',
            bind: '{record.firstname}'
        }, {
            xtype: 'textfield',
            label: 'Nom',
            bind: '{record.lastname}'
        }, {
            xtype: 'textfield',
            label: 'Emploi',
            bind: '{record.occupation}'
        }]
    }]

});