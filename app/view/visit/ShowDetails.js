Ext.define('App.view.visit.ShowDetails', {
    extend: 'Ext.Panel',
    xtype: 'visitshowdetails',

    title: 'Détails',

    tpl: [
        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Date</div>',
                '<div class="value">{startDate:date("d F Y")}</div>',
                '<div class="extra">Il y a {startDate:dateDiff(new Date())}</div>',
            '</div>',
            '<div class="item">',
                '<div class="label">Personnes rencontrées</div>',
                '<div class="value">{metPeople}</div>',
            '</div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Motif</div>',
                '<div class="value">{motive}</div>',
            '</div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Lieux visités</div>',
                '<div class="value">{visitedSites}</div>',
            '</div>',
        '</div>'
    ],

    bind: {
        record: '{record}'
    }
});
