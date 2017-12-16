Ext.define('App.view.project.ShowHistory', {
    extend: 'Ext.Panel',
    xtype: 'projectshowhistory',

    cls: 'project-history',
    iconCls: 'x-fa fa-calendar',
    title: 'Historique',

    bind: {
        record: '{record}'
    },

    tpl: [
        '<div class="block-section">',
            '<div class="item"><div class="label">Réunion CPDH</div></div>',
            '<div class="item"><div class="label">Convention</div></div>',
            '<div class="item"><div class="label">Validation</div></div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item"><div class="value">{date_reunion_CPDH:date("d/m/Y")}</div></div>',
            '<div class="item"><div class="value" data-qtitle="Depuis" data-qtip="Précédant : {date_reunion_CPDH:dateDiff(values.date_convention)}">{date_convention:date("d/m/Y")}</div></div>',
            '<div class="item"><div class="value" data-qtitle="Depuis" data-qtip="Précédant : {date_convention:dateDiff(values.date_validation)}<br/>Début : {date_reunion_CPDH:dateDiff(values.date_validation_convention)}">{date_validation_convention:date("d/m/Y")}</div></div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item"><div class="label">Lancement</div></div>',
            '<div class="item"><div class="label">Exécution</div></div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item"><div class="value" data-qtitle="Depuis" data-qtip="Précédant : {date_convention:dateDiff(values.date_lancement)}<br/>Début : {date_reunion_CPDH:dateDiff(values.date_lancement)}">{date_lancement:date("d/m/Y")}</div></div>',
            '<div class="item"><div class="value" data-qtitle="Depuis" data-qtip="Précédant : {date_lancement:dateDiff(values.date_execution)}<br/>Début : {date_reunion_CPDH:dateDiff(values.date_execution)}">{date_execution:date("d/m/Y")}</div></div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item"><div class="label">Ouverture des plis</div></div>',
            '<div class="item"><div class="label">Implantation</div></div>',
            '<div class="item"><div class="label">Arrêt des travaux</div></div>',
            '<div class="item"><div class="label">Reprise des travaux</div></div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item"><div class="value">{date_ouverture_plis:date("d/m/Y")}</div></div>',
            '<div class="item"><div class="value" >{date_implantation:date("d/m/Y")}</div></div>',
            '<div class="item"><div class="value">{date_arret_travaux:date("d/m/Y")}</div></div>',           
            '<div class="item"><div class="value">{date_reprise_travaux:date("d/m/Y")}</div></div>',       
        '</div>',



        '<div class="block-section">',
            '<div class="item"><div class="label">Réception provisoire</div></div>',
            '<div class="item"><div class="label">Réception définitive</div></div>',
            '<div class="item"><div class="label">Visite Royale</div></div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item"><div class="value">{date_reception_provisoire:date("d/m/Y")}</div></div>',
            '<div class="item"><div class="value">{date_reception_definitive:date("d/m/Y")}</div></div>',     
            '<div class="item"><div class="value">{date_visite_royale:date("d/m/Y")}</div></div>',            
        '</div>'
    ]
});
