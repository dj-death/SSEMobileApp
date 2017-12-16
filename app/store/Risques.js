Ext.define('App.store.Risques', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.risques',

    requires: [
        'App.model.risk.Categorie',
        'App.model.risk.Rubrique',
        'App.model.risk.Risque',

        'Ext.direct.RemotingProvider',
    ],

    model: 'App.model.risk.Classe',

    parentIdProperty: 'parentId',

    root: {
        name: 'CARTOGRAPHIE DES RISQUES',
        iconCls: 'x-fa fa-cube'
    },

    autoLoad: true,

    sorters: 'name'

});