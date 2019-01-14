var http = require('http');
var serviceRoot = 'http://services.odata.org/v4/(S(mawbly245zmhklloaymwroaa))/TripPinServiceRW/';
getURL(serviceRoot + 'People');
function getURL(url) {
    var body = '';
    http.get(url, function (response) {
        response.on('data', function (chunk) {
            body+=chunk;
        });
        response.on('end', function () {
            console.log(body);
        });
    }).on('error', function(e) {
        console.log('ERROR: ' + e.message);
    });
}