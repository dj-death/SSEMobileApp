Ext.define('App.view.auth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authlogin',

    init: function() {
        this.callParent(arguments);

        this.control({
            'formpanel textfield': {
                specialkey: this.onSpecialKey
            }
        });

    },

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.onLoginTap();
        }
    },


    onLoginTap: function() {
        var me = this,
            form = me.lookup('form'),
            values = form.getValues();

        form.clearErrors();

        Ext.Viewport.setMasked({ xtype: 'loadmask' });

        App.model.Session.login(values.username, values.password)
            .then(function(session) {
                me.fireEvent('login', session);
            })
            .catch(function(errors) {
                var formErrors = App.util.Errors.toForm(errors);
                
                if (Ext.isObject(formErrors)) {
                    form.setErrors(formErrors);
                }
            })
            .then(function(session) {
                Ext.Viewport.setMasked(false);
            });
    }
});
