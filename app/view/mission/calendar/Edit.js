Ext.define('App.view.mission.calendar.Edit', {
    extend: 'Ext.calendar.form.Edit',
    xtype: 'schedule-form-edit',

    viewModel: {
        type: 'missionshow'
    },

    title: 'Modifier une Visite Prévue',

    width: 700,


    config: {
        /**
         * @cfg {Object} calendarField 
         * The config for the calendar field.
         */
        calendarField: {
            xtype: 'calendar-calendar-picker',
            label: 'Agenda',
            name: 'calendarId',
            displayField: 'title',
            valueField: 'id'
        },


        productField: {
            xtype: 'combobox',
            label: 'Produit concerné',
            reference: 'productField',

            name: 'product_id',
            itemId: 'product_id',

            displayField: 'label',
            valueField: 'value',

            queryMode: 'local',
            required: true,
            bind: {
                store: '{products}'
            }
        },

                /**
         * @cfg {Object} titleField 
         * The config for the title field.
         */
        titleField: {
            xtype: 'textfield',
            label: 'Titre',
            name: 'title',
            hidden: true,

            bind: '{productField.selection.label}'
        },


        assigneeField: {
            xtype: 'combobox',
            label: 'Responsable',

            name: 'assignee_id',
            itemId: 'assignee_id',

            displayField: 'label',
            valueField: 'value',
            queryMode: 'local',

            required: true,

            bind: {
                store: '{assignees}'
            }

        },
 
        /**
         * @cfg {Object} startDateField 
         * The config for the start date field.
         */
        startDateField: {
            xtype: 'datepickerfield',
            dateFormat: 'd/m/Y',
            label: 'De',
            itemId: 'startDate',
            name: 'startDate'
        },
 
        /**
         * @cfg {Object} startTimeField 
         * The config for the start time field.
         */
        startTimeField: {
            xtype: 'calendar-timefield',
            label: '&#160;',
            itemId: 'startTime',
            name: 'startTime'
        },
 
        /**
         * @cfg {Object} endDateField 
         * The config for the end date field.
         */
        endDateField: {
            xtype: 'datepickerfield',
            dateFormat: 'd/m/Y',
            label: 'à',
            itemId: 'endDate',
            name: 'endDate'
        },
 
        /**
         * @cfg {Object} endTimeField 
         * The config for the end time field.
         */
        endTimeField: {
            xtype: 'calendar-timefield',
            label: '&#160;',
            itemId: 'endTime',
            name: 'endTime'
        },
 
        /**
         * @cfg {Object} allDayField 
         * The config for the all day field.
         */
        allDayField: {
            xtype: 'checkboxfield',
            itemId: 'allDay',
            name: 'allDay',
            label: 'Toute la journée',
            listeners: {
                change: 'onAllDayChange'
            }
        },
 
        /**
         * @cfg {Object} descriptionField 
         * The config for the description field.
         */
        descriptionField: {
            xtype: 'textareafield',
            label: 'Description',
            name: 'description',
            flex: 1,
            minHeight: '6em'
        },
 
        /**
         * @cfg {Object} dropButton 
         * The config for the drop button. `null` to not show this button.
         */
        dropButton: {
            text: 'Supprimer',
            handler: 'onDropTap'
        },
 
        /**
         * @cfg {Object} saveButton 
         * The config for the save button.
         */
        saveButton: {
            text: 'Enregistrer',
            handler: 'onSaveTap',
        },
 
        /**
         * @cfg {Object} cancelButton 
         * The config for the cancel button.
         */
        cancelButton: {
            text: 'Annuler',
            handler: 'onCancelTap'
        }
    },


    createItems: function() {
        var me = this,
            calField = me.getCalendarField();
 
        if (!calField.store) {
            calField.store = me.getCalendarStore();
        }
 
        me.add([{
            xtype: 'fieldset',
            scrollable: me.isCompact ? 'y' : undefined,
            margin: 0,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                calField,
                me.getProductField(),
                me.getTitleField(),
                me.getAssigneeField(),
                me.getStartDateField(),
                me.getStartTimeField(),
                me.getEndDateField(),
                me.getEndTimeField(),
                me.getAllDayField(),
                me.getDescriptionField()
            ]
        }]);
    },


    consumeEventData: function() {
        var me = this,
            D = Ext.Date,
            view = me.getView(),
            event = me.getEvent(),
            start = event.getStartDate(),
            end = event.getEndDate(),
            allDay = event.getAllDay(),
            // Don't take into account the view TZ for allday events 
            startDate = allDay ? D.utcToLocal(start) : view.utcToLocal(start),
            endDate = allDay ? D.utcToLocal(end) : view.utcToLocal(end),
            ignoreTimes = allDay || startDate.getTime() === endDate.getTime(),
            data = {
                calendarId: event.getCalendarId(),
                title: event.getTitle(),
                description: event.getDescription(),
                allDay: allDay,
                startDate: startDate,
                endDate: endDate,

                mission_id: event.get('mission_id'),
                product_id: event.get('product_id'),
                assignee_id: event.get('assignee_id')

            }, editable;
 
        if (!ignoreTimes) {
            data.startTime = startDate;
            data.endTime = endDate;
        }
 
        if (allDay) {
            data.endDate = D.subtract(endDate, D.DAY, 1, true);
        }
 
        me.setDefaultTime(data, 'startTime', me.defaultStartTime);
        me.setDefaultTime(data, 'endTime', me.defaultEndTime);
 
        if (!data.calendarId) {
            editable = view.getEditableCalendars();
            if (editable.length) {
                data.calendarId = editable[0].id;
            }
        }
 
        return data;
    },
 
    produceEventData: function(values) {
        var D = Ext.Date,
            view = this.getView(),

            startTime = values.startTime,
            endTime = values.endTime,
            startDate = values.startDate,
            endDate = values.endDate,
            sYear = startDate.getFullYear(),
            sMonth = startDate.getMonth(),
            sDate = startDate.getDate(),
            eYear = endDate.getFullYear(),
            eMonth = endDate.getMonth(),
            eDate = endDate.getDate();
 
        if (values.allDay) {
            // All day events are always GMT. 
            startDate = D.utc(sYear, sMonth, sDate);
            // midnight the next day 
            endDate = D.add(D.utc(eYear, eMonth, eDate), D.DAY, 1, true);
            delete values.startTime;
            delete values.endTime;
        } else {
            startDate = view.toUtcOffset(new Date(sYear, sMonth, sDate, startTime.getHours(), startTime.getMinutes()));
            endDate = view.toUtcOffset(new Date(eYear, eMonth, eDate, endTime.getHours(), endTime.getMinutes()));
        }
 
        values.startDate = startDate;
        values.endDate = endDate;
 
        return values;
    }
 

});