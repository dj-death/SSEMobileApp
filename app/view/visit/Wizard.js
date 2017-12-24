Ext.define('App.view.visit.Wizard', {
    extend: 'App.view.widgets.Wizard',
    xtype: [
        'visitwizard',
        'visitcreate',
        'visitedit'
    ],

    viewModel: {
        type: 'visitwizard'
    },

    controller: {
        type: 'visitwizard'
    },

    bind: {
        title: '{record.phantom? "Ajouter" : "Modifier"} Visite'
    },

    width: 700,
    height: 600,

    screens: [{
        title: 'Infos Visite',
        iconCls: 'x-fa fa-eye',

        defaults: {
            labelAlign: 'left'
        },

        items: [{
            xtype: 'combobox',
            reference: 'productCombo',
            label: 'Produit concerné',
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            required: true,
            bind: {
                value: '{record.product_id}',
                store: '{products}'
            },

            listeners: {
                change: 'onProductChange',
                buffer: 500
            }
        }, {
            xtype: 'datepickerfield',
            reference: 'startDate',
            label: 'Date de la Visite',
            dateFormat: 'd/m/Y',
            required: true,
            bind: '{record.startDate}'
        }, {
            xtype: 'combobox',
            label: 'Responsable',
            displayField: 'lastname',
            valueField: 'id',

            /*displayField: 'label',
            valueField: 'value',*/

            queryMode: 'local',
            required: true,
            bind: {
                value: '{record.assignee_id}',
                store: '{assignees}'
            }

        }, {
            xtype: 'combobox',
            label: 'Mission',

            displayField: 'name',
            valueField: 'id',

            /*displayField: 'label',
            valueField: 'value',*/
            queryMode: 'local',
            required: true,
            bind: {
                value: '{record.mission_id}',
                store: '{missions}'
            }
            
        }, {
            xtype: 'textareafield',
            reference: 'visitedSites',
            label: 'Lieux visités',
            bind: '{record.visitedSites}'
        }, {
            xtype: 'textareafield',
            reference: 'metPeople',
            label: 'Personnes Rencontrées',
            bind: '{record.metPeople}'
        }]

    }, {
        title: 'Suivi-Evaluation',
        iconCls: 'x-fa fa-eye',

        layout: 'fit',

        items: [{
            xtype: 'moneva'
        }]

    }/*, {
        title: 'Risques avérés',
        iconCls: 'x-fa fa-warning',

        layout: 'fit',

        listeners: {
            activate: 'onRisksWizardActivate'
        },
        
        items: [{
            xtype: 'riskslist'
        }]

    }*/, {
        title: 'Conclusions',
        iconCls: 'x-fa fa-info',

        defaults: {
            labelAlign: 'left'
        },

        layout: 'vbox',
        
        items: [{
            xtype: 'textareafield',
            reference: 'observations',
            placeholder: 'Observations',
            bind: '{record.observations}',

            flex: 2,
            minHeight: 200,
            padding: 10,
            margin: 10
        }, {
            xtype: 'recommandations',
            bodyPadding: 15,
            shadow: true,

            flex: 1          
        }]
    }]
});