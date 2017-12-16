Ext.define('App.view.main.MenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainmenu',

    init: function () {
        var Menu = Ext.data.StoreMgr.lookup('Menu'),
            user = this.getViewModel().get('user'),
            userRole = user.get('role');

        Menu.each(function (entry) {
            if (entry.get('role') < userRole) {
                Menu.remove(entry);
            }
        });
    },

    collapse: function() {
        this.getView().setExpanded(false);
    },

    onPrintTap: function () {
        window.print();
    },

    onTriggerTap: function() {
        var view = this.getView();
        view.setExpanded(!view.getExpanded());
    },

    onMenuChildTap: function(menu, location) {
        var record = location.record;
        if (record) {
            this.redirectTo(record.getId());
            this.collapse();
        }
    },

    onProfileTap: function() {
        this.redirectTo(this.getViewModel().get('user'));
        this.collapse();
    },

    onLogoutTap: function() {
        if (this.fireEvent('logout')) {
            this.collapse();
        }
    }
});