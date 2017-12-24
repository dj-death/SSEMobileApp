Ext.define('App.view.phone.main.MainController', {
    extend: 'App.view.main.MainController',
    alias: 'controller.phone-main',

    getContainerForViewId: function(id) {
        var regex = /^(person|project|product|partner|visit|risk|mission)(show|create|edit)$/;
        return this.lookup(id.match(regex)? 'navigation' : 'views');
    }
});
