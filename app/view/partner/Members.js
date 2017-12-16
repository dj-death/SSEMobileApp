Ext.define('App.view.partner.Members', {
    extend: 'Ext.grid.Grid',
    xtype: 'members',

    bodyPadding: 15,
    shadow: true,
    minHeight: 200,

    store: 'Members',

    title: 'Liste des Membres',
    titleBar: {
        shadow: false,
        docked: 'top',
        items: [{
            align: 'right',
            xtype: 'button',
            iconCls: 'fa fa-plus',
            tooltip: 'Ajouter Membre',
            handler: 'onCreateMember'
        }]
    },

    ui: 'listing',

    listeners: {
        childdoubletap: 'onMemberEdit'
    },

    rowNumbers: {
        minWidth: 35,
        align: 'center'
    },

    columns: [{
        text: 'CIN',
        dataIndex: 'CIN',
        cell: {
            tools: {
                close: {
                    handler: 'removeMember',
                    tooltip: 'Supprimer ce Membre',
                    zone: 'end'
                }
            }
        }
    }, {
        text: 'Fonction',
        dataIndex: 'title'
    }, {
        text: 'Prénom',
        dataIndex: 'firstname'
    }, {
        text: 'Nom',
        dataIndex: 'lastname'
    }, {
        text: 'Emploi',
        dataIndex: 'occupation'
    }]
});
