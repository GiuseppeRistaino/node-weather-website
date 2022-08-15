/**
 * 
 * Username: Vrexas1@gmail.com
 * password: fulm1c0t0n3
 * API Access Key: 764c275d21fc9e564e58d8c3772a98f4
 * 
 * Base URL: API requests start out with the following base URL: http://api.weatherstack.com/
 * 
 * Lat Long Atripalda: 40.912763, 14.851660
 * http://api.weatherstack.com/current?access_key=764c275d21fc9e564e58d8c3772a98f4&query=40.912763,14.851660
 * 
 * Libreria utilizzata per le chiamate http
 * https://www.npmjs.com/package/request
 * Anche se deprecata va bene ancora
 * 
 * Libreria per le chiamate HTTP non deprecata:
 * https://www.npmjs.com/package/postman-request
 * 
 * Qui utilizzeremo postman-request
 */

const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=764c275d21fc9e564e58d8c3772a98f4&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    
    request({uri: url, json: true, callback: (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!')
        }
        else if(body.error) {
            callback('Unable to find location!')
        }
        else {
            const message = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`
            callback(undefined, message)
        }
    }})
}

module.exports = forecast