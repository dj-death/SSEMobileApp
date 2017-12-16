Ext.define('App.view.mission.calendar.Add', {
    extend: 'Ext.calendar.form.Add',
    xtype: 'schedule-form-add',

    title: 'Ajouter une Visite Prévue',

    viewModel: {
        type: 'missionshow'
    },


    width: 700,

    listeners: {
        beforesubmit: 'beforeSubmitVisit',
        scope: 'controller'
    },

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

        missionField: {
            xtype: 'textfield',
            label: 'Mission',
            name: 'mission_id',
            hidden: true,

            listeners: {
                initialize: function (cmp) {
                    var id = location.hash.split('/')[1];

                    cmp.setValue(id);
                }
            }
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
            handler: 'onSaveTap'
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
                me.getMissionField(),
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
 

});