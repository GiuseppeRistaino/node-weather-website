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
const path = require('path')    //path fornisce una serie di funzioni per trovare percorsi all'interno del file system

console.log(path.join(__dirname, '../../public'))

const app = express()

const publicDirectoryPath = path.join(__dirname, '../../public')

//Per utilizzare il plugin hbs
//Diremo a Express di utilizzarlo richiamando il metodo "set"
//Il metodo set è utilizzato per impostare il valore di alcune impostazioni (viste come chiavi)
//Riferimento per la funzione: https://expressjs.com/it/4x/api.html#app.set
//Riferimento per la tabella per le impostazioni chiave: https://expressjs.com/it/4x/api.html#app.settings.table
app.set('view engine', 'hbs')
//Impostiamo anche la directory dove andare a controllare i file hbs
const viewsDirectoryPath = path.join(__dirname, '../../views')
app.set('views', viewsDirectoryPath)

app.use(express.static(publicDirectoryPath))

app.get('/index', (req, res) => {
    /**
     * Qualsiasi nome darai al render 
     * comunque verrà data priorità al file index.html
     * Per questo motivo solo per l'index in hbs per il momento
     * ho aggiunto il route /index per prendere il file hbs
     * Infatti se è presente il file index.html verrà visualizzato questo
     * anzichè il file hbs
     */
    res.render('index', {
        title: 'Weather App',
        name: 'Jak Ray'
    }) //index deve metchare con il nome del file hbs che si vuole riprodurre
})

/**
 * Goal: Create a template for help page
 * 
 * 1. Setup a help template to render a help message to the screen
 * 2. Setup the help route and render the template with an example message
 * 3. Visit the route in the browser and see your help message print
 */

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