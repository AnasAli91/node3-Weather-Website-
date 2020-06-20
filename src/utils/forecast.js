const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1e513fe454e25e7e8848a213a9cc1ee2&query=${latitude},${longitude}&units=f`
request({ url, json: true }, (error, { body }) => { 
    if (error) {
        callback('Unable to connect to weather services', undefined)
    } else if (body.error) {
        callback('unable to find location', undefined)
    } else {
        callback(undefined, `${body.current.weather_descriptions[0]}. Its currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees. The humidity is currently ${body.current.humidity} with a visibility of ${body.current.visibility}`)
    }
    })
}


module.exports = forecast

