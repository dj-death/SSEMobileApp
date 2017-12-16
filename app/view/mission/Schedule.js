Ext.define('App.view.mission.Schedule', {
    extend: 'Ext.Panel',
    xtype: 'schedule',

    requires: [
        'Ext.calendar.panel.Panel',
        'Ext.calendar.form.Add',
        'Ext.calendar.form.Edit'
    ],

    reference: 'calendar',

    layout: 'fit',

    minHeight: 550,

    items: [{
        xtype: 'missioncalendar',
        
        views: {
            day: {
                label: 'Jour',

                startTime: 10,
                endTime: 16,

                addForm: {
                    xtype: 'schedule-form-add'
                },

                editForm: {
                    xtype: 'schedule-form-edit'
                }
            },

            week: {
                xtype: 'calendar-week',
                titleTpl: '{start:date("j M")} - {end:date("j M")}',
                label: 'Semaine',
                weight: 15,
                dayHeaderFormat: 'D d',
                firstDayOfWeek: 1,
                visibleDays: 5,

                startTime: 10,
                endTime: 16,

                addForm: {
                    xtype: 'schedule-form-add'
                },

                editForm: {
                    xtype: 'schedule-form-edit'
                }
            },

            month: {
                xtype: 'calendar-month',
                titleTpl: '{start:date("F Y")}',
                label: 'Mois',
                weight: 30,

                firstDayOfWeek: 1,

                addForm: {
                    xtype: 'schedule-form-add'
                },

                editForm: {
                    xtype: 'schedule-form-edit'
                }
            }
        },

        timezoneOffset: 0,

        bind: {
            store: '{calendars}'
        }
    }]

});