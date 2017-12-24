Ext.define('App.view.project.Show', {
    extend: 'App.view.widgets.Show',
    xtype: 'projectshow',

    controller: 'projectshow',
    viewModel: {
        type: 'projectshow'
    },

    title: 'Fiche Projet',

    items: {

        header: {
            xtype: 'projectshowheader',

            items: {
                title: {
                    tpl: [
                        '<div class="name" data-qtip="{intitule}">{intitule}</div>',
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
                            xtype: 'projectshowpictures',
                            bind: {
                                hidden: '{!imagescount}'
                            }
                        },


                        details: {
                            xtype: 'projectshowdetails'
                        },

                        history: {
                            xtype: 'projectshowhistory'
                        },

                        porteur: {
                            xtype: 'projectshowporteur'
                        },

                        finances: {
                            xtype: 'projectshowfinances'
                        },

                        comments: {
                            xtype: 'projectshowcomments'
                        }
                    }
                }
            }
        }
    }
});
