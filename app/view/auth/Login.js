Ext.define('App.view.auth.Login', {
    extend: 'Ext.Container',
    xtype: 'authlogin',

    controller: 'authlogin',

    cls: 'auth-login',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    items: [{
        cls: 'auth-header',
        html:
            '<span class="logo x-fa fa-eercast"></span>'+
            '<div class="title">T@QyEM</div>'+
            '<div class="caption">DAS Meknès</div>'
    }, {
        xtype: 'formpanel',
        reference: 'form',
        layout: 'vbox',
        ui: 'auth',

        items: [{
            xtype: 'textfield',
            name: 'username',
            placeholder: "Identifiant",
            required: true
    
        }, {
            xtype: 'passwordfield',
            name: 'password',
            revealable: true,
            clearable: false,
            placeholder: 'Mot de Passe',
            required: true
        }, {
            xtype: 'button',
            reference: 'okButton',
            text: 'Se Connecter',
            iconAlign: 'right',
            iconCls: 'x-fa fa-angle-right',
            handler: 'onLoginTap',
            ui: 'action'
        }]
    }, {
        cls: 'auth-footer',
        html:
            '<div>Développé par</div>'+
            '<a href="#">'+
                '<span class="label">Mohamed DIDI</span>'+
            '</a>'
    }]
});
