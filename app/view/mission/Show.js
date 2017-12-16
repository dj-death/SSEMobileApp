Ext.define('App.view.mission.Show', {
    extend: 'App.view.widgets.Show',
    xtype: 'missionshow',

    controller: 'missionshow',
    viewModel: {
        type: 'missionshow'
    },

    title: 'Liste des Missions',


    items: {
        header: {
            minHeight: 100,
            items: {
                title: {
                    tpl: [
                        '<div class="icon x-fa fa-briefcase"></div>',
                        '<div class="name">{name}</div>',
                        '<div class="desc">de <b>{start_date:date("d M Y")}</b> à <b>{end_date:date("d M Y")}</b></div>'
                    ]
                }
            }
        },

        content: {
            items: {
                right: null,
                left: {
                    items: {
                        schedule: {
                            xtype: 'schedule'
                        }
                    }
                }
            }
        }
    }
});
