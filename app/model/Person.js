function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash - 6000;
} 

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

Ext.define('App.model.Person', {
    extend: 'App.model.Base',

    fields: [
        { name: 'username', type: 'string' },
        { name: 'firstname', type: 'string' },
        { name: 'lastname', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'programme', type: 'string' },
        { name: 'picture', type: 'string', defaultValue: '/resources/images/user.png'},
        { name: 'role', type: 'int' }, // 0: admin, 1: SSE, 2: DAS, 3: Guest

        // Calculated fields
        { name: 'fullname', calculate: function (data) {
            return data.firstname + ' ' + data.lastname;
        }},

        // Calculated fields
        { name: 'color', calculate: function (data) {
            
            return '#' + intToRGB(hashCode(data.lastname));
        }}
    ],

    proxy: {
        api: {
            prefix: 'Server.people'
        }
    },

    statics: {
        /**
         * The server people.list() API treats differently a request containing a specific id,
         * in which case it will lookup for the id (GUID), username and email. That means the
         * returned id may be different from the requested one. Since the static Model.load()
         * method perfoms a check on the returned id, we need first to create a phantom record,
         * then request the server with the desired id.
         */
        load: function(id, options, session) {
            var record = Ext.create('App.model.Person');
            record.setSession(session),
            record.load(
                Ext.apply({ params: { id: id } }, options)
            );

            App.user = record;
        }
    },

    // @see https://tools.ietf.org/html/rfc3966
    phoneCall: function() {
        var me = this,
            num = me.get('phone'),
            ext, url;

        if (Ext.isEmpty(num)) {
            return false;
        }

        url = 'tel:' + num;
        ext = me.get('extension');
        if (!Ext.isEmpty(ext)) {
            url += ';ext=' + ext;
        }

        return me.openUrl(url);
    },

    openUrl: function(url, browser) {
        return !!window.open(url, browser? '_system' : '_self');
    }
});
