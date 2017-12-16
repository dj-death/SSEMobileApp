Ext.define('App.view.mission.Calendar', {
    extend: 'Ext.calendar.panel.Panel',
    xtype: 'missioncalendar',

    config: {
        calendarList: {
            padding: 8
        },

        sideBar: {
            ui: 'default',
            bodyPadding: 0,
            title: 'Planning'
        },

        sheet: {
            title: 'Calendrier',
            ui: 'dark'
        },

        sideBarHeader: {
            weight: -1,
            margin: '0 0 3em 0'
        },

        createButton: {
            xtype: 'button',
            cls: Ext.baseCSSPrefix + 'calendar-panel-create-button',
            text: 'Ajouter Visite'
        }
    },

    privates: {
        attachHeader: function(c) {
            // we need to initialize the header within the panel scope (instead of
            // the sheet one) to ensure that bindings are correctly resolved.
            c.items.unshift(this.getSideBarHeader());
            return c;
        },

        createSheet: function() {
            return this.attachHeader(this.callParent());
        },
        createSideBar: function() {
            return this.attachHeader(this.callParent());
        }
    }

});