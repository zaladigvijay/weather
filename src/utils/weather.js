const request = require('request');

const weather = (latitude,longitude, callback) => {
    
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=08fac5743cdb4f4d572927b28cb3a14a&units=metric';

    request({ url: url, json: true }, function (error, { body }) {
        console.log('weather api call')
        console.log(url)
        if (error) {
            callback('unable to connect with geocode',undefined)
        }
        else if (body.message) {
            callback('Location not find try another',undefined)
        }
        else {
            callback(undefined, 'Temprature ' + body.main.temp)}
       
    })
}

module.exports = weather;