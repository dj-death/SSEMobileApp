Ext.define('App.store.INDH.StatutsJuridiques', {
    extend: 'Ext.data.Store',

    alias: 'store.statutsjuridiques',

    fields: ['value'],

    data: [
        { value: "Association" },
        { value: "Collectivité locale" },
        { value: "Coopérative" },
        { value: "Entreprise publique" },
        { value: "Service extérieur" },
        { value: "Société de personnes" } 
    ]    
    
});
