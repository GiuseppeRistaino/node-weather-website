/**
 * Geocoding è il processo che si occupa di convertire un indirizzo in una coppia di coordinate (longitudine e latitudine).
 * Useremo il servizio di Mapbox per la libreria Geocoding
 * https://www.mapbox.com/
 * Username: Vrexas
 * Email: vrexas1@gmail.com
 * PW: 2^RyRqRz&r2x8F^
 * Access Token: pk.eyJ1IjoidnJleGFzIiwiYSI6ImNsNmk0M3Z0dTJibW4zYnFscTJoeTFzcWgifQ.0mR3lnyp54Al8dFZkYiI6A
 * 
 * Esempio: https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidnJleGFzIiwiYSI6ImNsNmk0M3Z0dTJibW4zYnFscTJoeTFzcWgifQ.0mR3lnyp54Al8dFZkYiI6A&limit=1 
 */

const request = require('postman-request')

const geocode = (address, callback) => {
    //la funzione encodeURIComponent permette di convertire la stringa in un formato per l'URI nel caso in cui contenga dei caratteri speciali (ad esempio ?)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidnJleGFzIiwiYSI6ImNsNmk0M3Z0dTJibW4zYnFscTJoeTFzcWgifQ.0mR3lnyp54Al8dFZkYiI6A&limit=1'
  
    request({url: url, json: true, callback: (error, { body }) => {
      if(error) {
        callback('Unable to connect to mapbox service!')
      }
      else if(body.features.length === 0) {
        callback('Unable to find the location!. Try another location.')
      }
      else {
        const latitude = body.features[0].center[1]
        const longitude = body.features[0].center[0]
        const location = body.features[0].place_name
        callback(undefined, {
          latitude,
          longitude,
          location
        })
      }
    }})
  }

  module.exports = geocode