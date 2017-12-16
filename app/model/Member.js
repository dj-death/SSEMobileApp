Ext.define('App.model.Member', {
    extend: 'App.model.Base',

    fields: [
        { name: 'firstname', type: 'string' },
        { name: 'lastname', type: 'string' },
        { name: 'CIN', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'occupation', type: 'string' },

        { name: 'partner_id', reference: 'Partner' }
    ],

    proxy: {
        api: {
            prefix: 'Server.members'
        }
    }
    
});