const request = require('request');

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiemFsYWRpZzk4IiwiYSI6ImNrYnMxa25kNDFnamwycXBuZG9mY21xMTkifQ.XF_6Tby0q6dC74U7gQjEYQ';
    console.log(url)
    
    request({ url: url, json: true }, function (error, {body}) {
        if (error) {
            callback('unable to connect with geocode',undefined)
        }
        else if (body.message) { 
            callback(body.message)
        }
        else if (body.features.length === 0) {
            callback('Location not find try another',undefined)
        }
        else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:body.features[0].place_name
            })
       }
    })
}

module.exports = geocode;