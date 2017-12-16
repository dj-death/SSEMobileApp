Ext.define('App.store.INDH.Statuts', {
    extend: 'Ext.data.Store',

    alias: 'store.statuts',

    fields: ['code', 'value'],

    data: [
        { code: 1, value: "Achevé (considéré non opérationnel)" },
        { code: 2, value: "En arrêt" },
        { code: 3, value: "En arrêt d'activité" },
        { code: 4,  value: "En cours de lancement" },
        { code: 5,  value: "En cours de résiliation" },
        { code: 6, value: "En cours d'exécution" },
        { code: 7, value: "En retard d'exécution" },
        { code: 8, value: "Non démarré" },
        { code: 9, value: "Non initié" },
        { code: 10, value: "Opérationnel" },
        { code: 11, value: "Résilié" },
        { code: 12, value: "Annulé" }
    ]    
    
});
