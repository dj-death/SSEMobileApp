Ext.define('App.view.partner.Show', {
    extend: 'App.view.widgets.Show',
    xtype: 'partnershow',

    controller: 'partnershow',
    viewModel: {
        type: 'partnershow'
    },

    title: 'Partner',

    items: {
        header: {
            items: {
                title: {
                    tpl: [
                        '<div class="name">{name}</div>',
                        '<div class="desc">Présidé par <b>{president}</b><div>'
                    ]
                }
            }
        },

        content: {
            items: {
                left: {
                    items: {
                        details: {
                            xtype: 'partnershowdetails'
                        },

                        organization: {
                            xtype: 'partnershoworg'
                        },

                        governement: {
                            xtype: 'partnershowgovernement'
                        },

                        projects: {
                            xtype: 'partnershowprojects'
                        },

                        products: {
                            xtype: 'partnershowproducts'
                        },

                        /*reports: {
                            xtype: 'partnershowfinances'
                        },*/

                        comments: {
                            xtype: 'partnershowcomments'
                        }

                    }
                }
            }
        }
    }
});
