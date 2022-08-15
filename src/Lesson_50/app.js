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
const hbs = require('hbs') 

console.log(path.join(__dirname, '../../public'))

const app = express()

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
    res.send({
        location: 'Atripalda',
        forecast: 'Cloud. 100% rain.'
    }) 
})

/**
 * Goal: Create and render a 404 page with handlebars
 * 
 * 1. Setup the template to render the header and footer
 * 2. Setup the template to render an error message in a paragraph
 * 3. Render the template for both 404 routes
 *  - Page not found
 *  - Help article not found
 * 4. Test your work. Visit /what and /help/units
 */

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


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})