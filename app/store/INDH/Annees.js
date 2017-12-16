Ext.define('App.store.INDH.Annees', {
    extend: 'Ext.data.Store',

    alias: 'store.annees',

    fields: ['value'],

    data: [],

    constructor: function () {
        this.callParent(arguments);

        var records = [],
            currYear = (new Date()).getFullYear(),
            year = 2005;

        for (; year <= currYear; ++year) {
            records.push({
                'value': year
            });
        }

        this.loadData(records);
    }
    
});
