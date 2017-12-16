Ext.define('App.store.INDH.Secteurs', {
    extend: 'Ext.data.Store',

    alias: 'store.secteurs',

    fields: ['code', 'value'],

    data: [
        { code: 0, value: "Adduction /Distribution Eau Potable" },
        { code: 1, value: "Equipements Administratifs" },
        { code: 2, value: "Agriculture" },
        { code: 3, value: "Artisanat" },
        { code: 4, value: "Assainissement et Protection de l'Environnement" },
        { code: 5, value: "Centre pour personnes besoins spécifiques" },
        { code: 24, value: "Centres d'Accueil (Socioéducatifs)" },
        
        { code: 6, value: "Centres de protection sociale" },
        { code: 25, value: "Equipements  pour personnes en situation de Précarité" },
        { code: 7, value: "Centres Polyvalents" },
        { code: 8, value: "Commerce, petite industrie et Services de proximité" },
        { code: 9, value: "Communication" },
        { code: 10, value: "Culture et culte" },
        { code: 11, value: "Éducation" },
        { code: 12, value: "Électrification et éclairage" },
        { code: 13, value: "Enquêtes et Études" },
        { code: 14, value: "Formation et renforcement des capacités" },
        { code: 15, value: "Formation Professionnelle" },
        { code: 16, value: "Jeunesse et sport" },
        { code: 17, value: "Pêche et Commerce de poissons" },
        { code: 18, value: "Protection de l'Environnement" },
        { code: 19, value: "Santé" },
        { code: 20, value: "Soutien aux associations / coopératives" },
        { code: 21, value: "Tourisme" },
        { code: 22, value: "Transports" },
        { code: 23, value: "Voirie" }
    ]

});
