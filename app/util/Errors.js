Ext.define('App.util.Errors', {
    statics: {
        toForm: function(errors) {
            var values = {};

            if (Ext.isObject(errors) && errors.errors) {
                errors = errors.errors;
            }
            
            if (Ext.isArray(errors)) {
                errors.forEach(function(error) {
                    var name = error.id || error.field || error.path;
                    var value = error.msg || error.message;
                    
                    if (name && value) {
                        values[name] = value;
                    }
                });

            } else {
                values = errors;
            }

            return values;
        },

        toMsg: function(errors) {
            var msg = "";

            if (! Ext.isEmpty(errors.message)) {
                msg = '<h2>' + errors.message + '</h2>';
            }

            if (Ext.isObject(errors) && errors.errors) {
                errors = errors.errors;
            }
            
            
            if (Ext.isArray(errors)) {

                msg += '<ol>';

                errors.forEach(function(error) {
                    var name = error.id || error.field || error.path;
                    var value = error.msg || error.message;

                    msg = msg + '<li><b>' + name + ' : </b>' + value + '</li>';
                });

                msg += '</ol>';
                
            } else {
                var name = errors.id || errors.field || errors.path;
                var value = errors.msg || errors.message;

                msg = msg + '<b>' + name + ' : </b><br/>' + '<br/>';
            }

            return msg;
        }
    }
});
