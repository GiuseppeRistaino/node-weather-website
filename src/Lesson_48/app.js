/**
 * Template Engine
 * Permette di gestire le parti comuni nelle diverse pagine.
 * Ad esempio navigando il sito si ha di solito la parte del
 * footer e del menu sempre identiche.
 * Quindi per evitare allo sviluppatore di copiare incollare
 * tali parti in tutti i file html si ricorre all'utilizzo
 * del Template Engine.
 * Libreria -> handlebars
 * https://www.npmjs.com/package/handlebars
 * 
 * Noi utilizzeremo HBS
 * Perchè può essere utilizzata come plugin per Express
 * https://www.npmjs.com/package/hbs
 */

const express = require('express')
const path = require('path')   

console.log(path.join(__dirname, '../../public'))

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../../public')
const viewsDirectoryPath = path.join(__dirname, '../../templates')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)

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
        title: 'HBS Help Better Sugar'
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
    res.send({
        location: 'Atripalda',
        forecast: 'Cloud. 100% rain.'
    }) 
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})