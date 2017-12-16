/**
 * Exposes new template modifiers (e.g. '{birthday:dateDiff(date, "y")}', etc.)
 */

function doesConnectionExist() {
    if (!navigator.onLine) {
        return false;
    }

    var xhr = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );
    var url = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png";
    var randomNum = Math.round(Math.random() * 10000);

    try {
        xhr.open('HEAD', url + "?rand=" + randomNum, true);
        xhr.send();
        return ( xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304) );

    } catch (error) {
        return false;
    }
}


Ext.define('App.overrides.ux.google.Map', {
    override: 'Ext.ux.google.Map'
});
