Ext.define('App.view.mission.Browse', {
    extend: 'App.view.widgets.Browse',

    fields: {
        /*manager: {
            property: 'manager_id'
        }*/
    },

    controller: 'missionbrowse',
    viewModel: {
        type: 'missionbrowse'
    },

    cls: 'missionbrowse',
    bind: {
        store: '{missions}'
    }
});
