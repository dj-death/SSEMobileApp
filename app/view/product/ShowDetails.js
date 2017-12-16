Ext.define('App.view.product.ShowDetails', {
    extend: 'Ext.Panel',
    xtype: 'productshowdetails',

    title: 'Détails',

    tpl: [
        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Date d\'opérationnalisation</div>',
                '<div class="value">{date_creation:date("d M Y")}</div>',
                '<div class="extra">{date_creation:dateDiff(new Date())}</div>',
            '</div>',

            '<div class="item">',
                '<div class="label">Statut</div>',
                '<div class="value">{statut}</div>',
            '</div>',

            '<div class="item">',
                '<div class="label">Niveau de pérennité</div>',
                '<div class="value">{niveau_perennite}</div>',
            '</div>',

            '<div class="item">',
                '<div class="label">Coût Global</div>',
                '<div class="value">{montant_global:dhMoney}</div>',
                '<div class="value">dont INDH: {part_INDH:dhMoney}</div>',
            '</div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Secteur d\'activité</div>',
                '<div class="value">{secteur_activite_principal}</div>',
                '<div class="extra">{secteur_activite}</div>',
            '</div>',

            '<div class="item">',
                '<div class="label">Bénéficiaires rééels / Capacitié</div>',
                '<div class="value">',
                    '{pop_benef_total_reel} / {capacite_accueil}',
                    '<div class="item-info">',
                        '<span class="x-fa fa-female"></span> {pop_benef_femme_reel} &nbsp;&nbsp;&nbsp;<span class="x-fa fa-male"></span> {pop_benef_homme_reel} &nbsp;&nbsp;&nbsp;',
                        '<span class="x-fa fa-child"></span> {pop_benef_jeune_reel} &nbsp;&nbsp;&nbsp;<span class="x-fa fa-home"></span> {pop_benef_menage_reel}',
                    '</div>',
                '</div>',
            '</div>',               
        '</div>',

        '<div class="block-section">',
            '<tpl if="partner">',
                '<div class="item">',
                    '<div class="label">Gestionnaire</div>',
                    '<div class="value">{mode_gestion} : {partner.name}</div>',
                    '<div class="extra">{partner.president}</div>',
                    '<div class="extra"><span class="x-fa fa-phone"></span> {partner.phone}</div>',
                '</div>',
                '<div class="item">',
                    '<div class="label">Activités du gestionnaire</div>',
                    '<div class="value">{activite1_gestionnaire}</div>',
                    '<div class="value">{activite2_gestionnaire}</div>',
                    '<div class="value">{activite3_gestionnaire}</div>',
                '</div>',
            '</tpl>',

            '<div class="item">',
                '<div class="label">Personnel d\'encadrement</div>',
                '<div class="value">{staff}</div>',
            '</div>',

            '<div class="item">',
                '<div class="label">Tarif moyen</div>',
                '<div class="value">{tarif_moyen:dhMoney}</div>',
                '<div class="extra">{tarifs_comment}</div>',
            '</div>',

            '<div class="item">',
                '<div class="label">Contact</div>',
                '<div class="value">{commune}, {quartier_douar}</div>',
                '<div class="extra">{address}</div>',
                '<div class="extra"><span class="x-fa fa-envelope-o"></span> {email}</div>',
                '<div class="extra"><span class="x-fa fa-phone"></span> {phone}</div>',
            '</div>',

            '<div class="block-section full-width">',
                '<div class="item">',
                    '<div class="label">Consistance</div>',
                    '<div class="value">{consistance}</div>',
                '</div>',
            '</div>',
        '</div>'
    ],

    bind: {
        record: '{record}'
    }
});
