Ext.define('App.view.person.Wizard', {
    extend: 'App.view.widgets.Wizard',
    xtype: [
        'personwizard',
        'personcreate',
        'personedit'
    ],

    controller: {
        type: 'personwizard'
    },

    viewModel: {
        type: 'personwizard'
    },

    bind: {
        title: '{record.phantom? "Ajouter" : "Modifier"} Utilisateur'
    },

    cls: 'person-create',

    width: 700,

    screens: [{
        title: 'Général',
        iconCls: 'x-fa fa-info',
        items: [{
            xtype: 'textfield',
            reference: 'firstname',
            label: 'Prénom',
            required: true,
            bind: '{record.firstname}',
            listeners: {
                blur: 'onNameFieldsBlur'
            }
        }, {
            xtype: 'textfield',
            reference: 'lastname',
            label: 'Nom',
            required: true,
            bind: '{record.lastname}',
            listeners: {
                blur: 'onNameFieldsBlur'
            }
        }, {
            xtype: 'textfield',
            reference: 'username',
            label: 'Nom utilisateur',
            required: true,
            bind: '{record.username}',
            listeners: {
                change: 'onUsernameChange'
            }
        }, {            
            xtype: 'selectfield',
            reference: 'role',
            label: 'Role',
            options: [{
                text: 'Admin',
                value: 0
            }, {
                text: 'SSE',
                value: 1
            }, {
                text: 'DAS',
                value: 2
            }, {
                text: 'Invité',
                value: 3
            }],

            required: true,
            bind: {
                value: '{record.role}',
                disabled: '{!isAdmin}'
            }

        }, {            
            xtype: 'selectfield',
            reference: 'programme',
            label: 'Programme',
            options: [
                'Tous',
                'Précarité',
                'Transversal',
                'Rural',
                'Urbain',
                'AGR'
            ],

            required: true,
            bind: {
                value: '{record.programme}',
                disabled: '{!isAdmin}'
            }

        }, {
            xtype: 'passwordfield',
            reference: 'password',
            label: 'Mot de passe',
            revealable: true,
            required: true,
            bind: {
                required: '{record.phantom}',
                placeholder: '{record.phantom? "" : "Ne rien changer"}',
                value: '{record.password}'
            }
        }, {
            xtype: 'passwordfield',
            reference: 'password_check',
            revealable: true,
            label: 'Confirmer Mot de passe',
            disabled: true,
            validators: {
                type: 'controller',
                fn: 'doPasswordMatch'
            },
            bind: {
                required: '{record.phantom}',
                disabled: '{!password.value}'
            }
        }]
    }, {
        title: 'Personnel',
        iconCls: 'x-fa fa-home',
        items: [{
            xtype: 'emailfield',
            reference: 'email',
            label: 'E-mail',
            bind: '{record.email}'
        }, {
            xtype: 'textfield',
            reference: 'phone',
            label: 'Téléphone',
            bind: '{record.phone}'
        }]
    }, {
        title: 'Professionnel',
        iconCls: 'x-fa fa-sitemap',
        items: [{
            xtype: 'textfield',
            reference: 'title',
            label: 'Fonction',
            required: true,
            bind: '{record.title}'
        }]
    }]
});
