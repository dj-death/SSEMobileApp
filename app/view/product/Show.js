Ext.define('App.view.product.Show', {
    extend: 'App.view.widgets.Show',
    xtype: 'productshow',

    controller: 'productshow',
    viewModel: {
        type: 'productshow'
    },

    title: 'Liste des Produits',

    items: {

        header: {
            xtype: 'productshowheader',
            weight: -10,

            items: {
                title: {
                    tpl: [
                        '<div class="name">{name}</div>',
                        '<div class="desc">{quartier_douar}, <b>{commune}</b><div>'
                    ]
                }
            }
        },

        map: {
            xtype: 'mapview',
            userCls: 'office-map',
            weight: -5,
            bind: {
                markers: '{markers}'
            }
        },

        content: {
            items: {
                left: {
                    items: {
                        pictures: {
                            xtype: 'productshowpictures',
                            bind: {
                                hidden: '{!imagescount}'
                            }
                        },

                        details: {
                            xtype: 'productshowdetails'
                        },

                        projects: {
                            xtype: 'productshowprojects'
                        },

                        visits: {
                            xtype: 'productshowvisits'
                        },

                        risks: {
                            xtype: 'productshowrisks'
                        },

                        comments: {
                            xtype: 'productshowcomments'
                        }
                    }
                }
            }
        }
    }
});
