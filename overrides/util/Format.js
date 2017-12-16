/**
 * Exposes new template modifiers (e.g. '{birthday:dateDiff(date, "y")}', etc.)
 */
Ext.define('App.overrides.util.Format', {
    override: 'Ext.util.Format',

    dhMoney: function (value) {
        var MMAD = value / 1000000,
            sign = 'DH',
            decimals = 0;

        if (MMAD >= 1) {
            sign = 'MMAD';
            value = MMAD;
            decimals = 2;
        }
        
        return this.currency(value, sign, decimals, true, ' ');
    },

    dateDiff: function(v0, v1, unit) {
        if (!Ext.isDate(v0) || !Ext.isDate(v1)) {
            return;
        }

        var seconds, name, diff;

        if (!unit || unit == 'auto') {
            seconds = Math.floor(Math.abs(+v1 - v0)/1000);
            unit =
                seconds < 1 ? 'ms' :           // 1 second
                seconds < 60 ? 's' :           // 1 minute
                seconds < 3600 ? 'mi' :        // 60 minutes
                seconds < 86400 ? 'h' :        // 24 hours
                seconds < 604800 ? 'd' :       // 7 days
                seconds < 2419200 ? 'w' :      // 4 weeks
                seconds < 31622400 ? 'mo' :    // 366 days
                'y';
        }

        switch (unit) {
            case 'ms': name = 'milliseconde'; break;
            case 's': name = 'seconde'; break;
            case 'mi': name = 'minute'; break;
            case 'h': name = 'heure'; break;
            case 'd': name = 'jour'; break;
            case 'w': name = 'semaine'; break;
            case 'mo': name = 'mois'; break;
            case 'y': name = 'année'; break;
            default:
        }

        diff = Ext.Date.diff(v0, v1, unit);

        if (unit === 'mo') {
            return Ext.util.Format.plural(diff, name, 'mois');
        } else {
            return Ext.util.Format.plural(diff, name);
        }
    },

    actionIconCls: function(type) {
        switch (type) {
        case 'profile': type = 'user'; break;
        case 'email': type = 'envelope'; break;
        default:
        }

        return 'x-fa fa-' + type;
    }
});
