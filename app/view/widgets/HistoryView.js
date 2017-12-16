Ext.define('App.view.widgets.HistoryView', {
    extend: 'Ext.dataview.DataView',
    xtype: 'historyview',

    config: {
        displayField: 'recipient.fullname'
    },

    cls: 'historyview',
    ui: 'history light',
    emptyText: 'Historique inexistant',
    deferEmptyText: false,
    minHeight: 80,
    inline: true,


    updateDisplayField: function(value) {
        this.setItemTpl([
            '<div class="history-item-wrapper">',
                '<div class="history-visual">',
                    '<div class="picture large recipient" style="background-color: {recipient.color};">{recipient.lastname}</div>',
                '</div>',
                '<div class="history-details">',
                    '<div class="display" data-qtitle="Par {recipient.fullname}" data-qtip="{subject}">{', value, '}</div>',
                    '<div><a href="#{object}">{object}</a></div>',
                    '<div class="date">{created:date(\'j F Y H:i\')} ( il y a {created:dateDiff(new Date())} )</div>',
                '</div>',
            '</div>'
        ]);
    },

    itemCls: 'history-item'
});
