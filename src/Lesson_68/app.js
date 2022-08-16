const express = require('express')
const path = require('path')  
const hbs = require('hbs') 

//Import geocode and forecast
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

console.log(path.join(__dirname, '../../public'))

const app = express()

//process.env preleva informazioni dalle variabili di ambiente
const port = process.env.PORT  || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../../public')
const viewsDirectoryPath = path.join(__dirname, '../../templates/views')
const partialDirectoryPath = path.join(__dirname, '../../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialDirectoryPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/index', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jak Ray'
    }) 
})

//http://localhost:3000/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HBS Help Better Sugar',
        name: 'Jak Ray'
    })
})


//http://localhost:3000/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jak Ray'
    }) 
})


//http://localhost:3000/weather
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You  must provide an address term'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {  
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastData
            })
        })
    })
      
})



app.get('/products', (req, res) => {
    console.log(req.query.search)
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})


//Il carattere * vuol dire metcha qualsiasi cosa
/**
 * N.B.: il get del wildcard * deve essere per forza 
 * di cose dichiarato alla fine (dopo la dichiarazione
 * di tutti gli altri get)
 * Questo perchè Express va a confrontare il path scorrendo i get
 * nel modo in cui sono dichiarati.
 * Quindi se dichiarassimo il get del wildcard prima del /weather
 * non potremmo raggiungere la pagina /weather.
 */
 app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: '404 Page',
        message: 'Help article not found',
        name: 'Jak Ray'
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404', {
        title: '404 Page',
        message: 'My 404 page',
        name: 'Jak Ray'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' +port)
})