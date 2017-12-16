Ext.define('App.profile.Tablet', {
    extend: 'Ext.app.Profile',

    views: {
        historybrowse: 'App.view.tablet.history.Browse',
        historybrowsetoolbar: 'App.view.tablet.history.BrowseToolbar',
        main: 'App.view.tablet.main.Main',
        
        personbrowse: 'App.view.tablet.person.Browse',
        personbrowsetoolbar: 'App.view.tablet.person.BrowseToolbar',

        projectbrowse: 'App.view.tablet.project.Browse',
        projectbrowsetoolbar: 'App.view.tablet.project.BrowseToolbar'
    },

    isActive: function () {
        return !Ext.platformTags.phone;
    },

    launch: function () {
        // Add a class to the body el to identify the phone profile so we can
        // override CSS styles easily. The framework adds x-phone so we could
        // use it but this way the app controls a class that is always present
        // when this profile isActive, regardless of the actual device type.
        Ext.getBody().addCls('tablet-profile');
    }
});
