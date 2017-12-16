Ext.define('App.view.tablet.recommandation.BrowseToolbar', {
    extend: 'App.view.widgets.BrowseToolbar',
    // xtype: 'recommandationbrowsetoolbar', -- set by profile

    items: {

        destination: {            
            xtype: 'selectfield',
            weight: 10,
            placeholder: 'Tout Destinataire',
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

            bind: {
                selection: '{filters.destination}'
            }

        }, 
        
        importance: {
            xtype: 'selectfield',
            weight: 11,

            placeholder: 'Toute Importance',

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

            bind: {
                selection: '{filters.importance}'
            }
        },
        
        urgency: {
            xtype: 'selectfield',
            placeholder: 'Toute Urgence',

            weight: 12,

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

            bind: {
                selection: '{filters.urgency}'
            }
        }
    }
});
