Ext.define('App.view.visit.Show', {
    extend: 'App.view.widgets.Show',
    xtype: 'visitshow',

    controller: 'visitshow',
    viewModel: {
        type: 'visitshow'
    },

    title: 'Liste des Visites',

    items: {
        header: {
            items: {
                title: {
                    tpl: [
                        '<div class="icon x-fa fa-eye"></div>',
                        '<div class="name">Visite de <b>{product.name}</b></div>',
                        '<div class="desc">Faite par <b>{assignee.fullname}</b><div>'
                    ]
                },

                printFiche: {
                    xtype: 'button',
                    handler: 'saveAsDocx',
                    iconCls: 'x-fa fa-file-word-o',
                    cls: 'no-print',
                    ui: 'flat',
                    weigth: 2,
                    text: 'Exporter Fiche',                    
        
                    platformConfig: {
                        phone: {
                            hidden: true
                        }
                    }
                }

            }
        },

        content: {
            items: {
                left: {
                    items: {
                        details: {
                            xtype: 'visitshowdetails'
                        },

                        conclusions: {
                            xtype: 'visitshowconclusions'
                        },

                        risks: {
                            xtype: 'visitshowrisks'
                        },

                        recommandations: {
                            xtype: 'visitshowrecommandations'      
                        }
                    }
                }
            }
        }
    }
});
