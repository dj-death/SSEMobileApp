Ext.define('App.store.INDH.Rubriques', {
    extend: 'Ext.data.Store',

    alias: 'store.rubriques',

    fields: ['code', 'value'],

    data: [
        { code: 1, value: "Promotion des activités génératrices de revenus et d'emplois" },
        { code: 2, value: "Soutien à l’accès aux équipements et services sociaux de base" },
        { code: 3, value: "Soutien à l’animation sociale, culturelle et sportive" },
        { code: 4, value: "Soutien au renforcement de la gouvernance et des capacités locales" },

        { code: 5, value: "Enquêtes et études" },
        { code: 6, value: "Construction et équipement des centres d'accueil" },
        { code: 7, value: "Mise à niveau des centres d'accueil" },

        { code: 8, value: "Dépenses afférentes à la mise en œuvre de l'INDH au niveau local" },
        { code: 9, value: "Soutien aux projets à forts impacts retenus dans le cadre des appels à projets" },
        { code: 10, value: "Subvention aux associations à titre de contribution au fonctionnement des centres d'accueil" },
       
        { code: 11, value: "INDH/LOCAL" }
    ]

});
