Ext.define('App.view.widgets.Wizard', {
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.tab.Panel',
        'Ext.layout.overflow.Scroller'
    ],

    controller: {
        type: 'wizard'
    },

    viewModel: {
        data: {
            record: null,
            finish: false
        }
    },

    /*eventedConfig: {
        record: null
    },*/

    listeners: {
        show: 'onShow'
    },

    config: {
        screens: [],

        toolbar: {
            xtype: 'toolbar',
            weighted: true,
            ui: 'tools',

            defaults: {
                ui: 'flat'
            },

            items: {
                prev: {
                    reference: 'prev',
                    handler: 'onPrevTap',
                    iconCls: 'x-fa fa-chevron-circle-left',
                    text: 'Précédant',
                    weight: -20
                },

                next: {
                    reference: 'next',
                    handler: 'onNextTap',
                    iconCls: 'x-fa fa-chevron-circle-right',
                    text: 'Suivant',
                    weight: -10
                }
            }
        }
    },

    platformConfig: {
        phone: {
            // In the "phone" profile, the "submit" button is located in the panel header while
            // "cancel" is the navigation "back" action added by default in phone/main/Main.js
            header: {
                items: {
                    submit: {
                        xtype: 'button',
                        handler: 'onSubmitTap',
                        iconCls: 'x-fa fa-save',
                        weight: 10
                    },

                    cancel: {
                        xtype: 'button',
                        handler: 'onCancelTap',
                        iconCls: 'x-fa fa-close',
                        weight: 20
                    }
                }
            },

            toolbar: {
                docked: 'bottom',
                layout: {
                    pack: 'end'
                }
            }
        },

        '!phone': {
            header: {
                items: {
                    cancel: {
                        xtype: 'button',
                        reference: 'cancel',
                        handler: 'onCancelTap',
                        iconCls: 'x-fa fa-3x fa-close',
                        tooltip: 'Annuler',
                        weight: 10,
                        ui: 'flat'
                    }
                }
            },

            toolbar: {
                userCls: 'page-constrained',
                docked: 'top',
                items: {
                    spacer: {
                        xtype: 'spacer',
                        weight: 10
                    },

                    submit: {
                        reference: 'submit',
                        handler: 'onSubmitTap',
                        weight: 20,
                        ui: 'action',
                        bind: {
                            hidden: '{!finish}',
                            text: '{record.phantom? "Créer" : "Enregistrer"}'
                        }
                    }
                }
            }
        }
    },

    modelValidation: true,
    layout: 'fit',
    height: 512,
    width: 300,

    bodyPadding: '10 8',
    scrollable: 'y',

    items: [{
        xtype: 'tabpanel',
        reference: 'tabs',

        defaults: {
            userCls: 'wizard-screen',
            scrollable: true,
            padding: 2,
            tab: {
                minWidth: 100,
                iconAlign: 'top'
            }
        },

        tabBar: {
            defaultTabUI: 'flat',
            ui: 'flat',

            layout: {
                pack: 'start',
                overflow: 'scroller'
            }
        },

        listeners: {
            add: 'onScreenAdd',
            remove: 'onScreenRemove',
            activeitemchange: 'onScreenActivate'
        }
    }],

    initialize: function() {
        var me = this;
        me.callParent();
        me.add(me.getToolbar());
        me.lookup('tabs').add(me.getScreens());
    },

    reset: function() {
        var me = this;
        me.callParent();
        me.fireEvent('reset');
        return me;
    },

    // [WORKAROUND] Ext.form.Panel override the setRecord and updateRecord methods in a way
    // that we can't use updateRecord to be notified when the record actually changes.
    setRecord: function(record) {
        this.getViewModel().set('record', record);
    }
});
