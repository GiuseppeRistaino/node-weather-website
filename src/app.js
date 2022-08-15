const express = require('express')
const path = require('path')    //path fornisce una serie di funzioni per trovare percorsi all'interno del file system
/**
 * __dirname
 * __filename
 * forniscono il percorso e il file in cui vi trovate
 */
//console.log(__dirname)
//console.log(__filename)

console.log(path.join(__dirname, '../public'))

const app = express()

//La funzione use permette di customizzre il server
//per ora aggiungeremo la caretella dove pescare i file statici
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

/**
 * Goal: Create two more HTML file
 * 
 * 1. Create a html page for about with "About" title
 * 2. Create a html page for help with "Help" title
 * 3. Remove the old route handlers for both
 * 4. Visit both in the browser to test your work
 */

//
/**
 * la funzione get verrà richiamata quando qualcuno tenta di
 * accedere alla risorsa a un dato path (primo argomento).
 * La funzione di callback (secondo argomento) sarà la funzione richiamata
 * quando qualcuno entra nel path.
 * http://localhost:3000/
 * Nel caso in cui utilizziate "app.use" con una cartella dei file statici
 * come riferimento, a questo indirizzo verrà preso il contenuto di quella cartella
 * e non <h1>Weather</h1>
 * Potrete visualizzare il contenuto dei file statici anche recandovi direttamente a quel'indirizzo:
 * http://localhost:3000/index.html
 */
app.get('', (req, res) => {
    res.send('<h1>Weather</h1>') //invierà la risposta al richiedente
})

// app.com
// app.com/help
// app.com/about

//http://localhost:3000/help
app.get('/help', (req, res) => {
    res.send([{
        name: 'Jak',
        age: 33
    },
    {
        name: 'Alice',
        age: 33
    }]) 
})

/**
 * Goal: Setup two new routes
 * 
 * 1. Setup an about route and render a page title
 * 2. Setup a weather route and render a page title
 * 3. Test your work by visiting both in the browser
 */
//http://localhost:3000/about
app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>') 
})

//http://localhost:3000/weather
app.get('/weather', (req, res) => {
    res.send({
        location: 'Atripalda',
        forecast: 'Cloud. 100% rain.'
    }) 
})

/**
 * Goal: Update routes
 * 
 * 1. Setup about route to render a title with html
 * 2. Setup a weather route to send back JSON
 *  - Object with forecast and location strings
 * 3. Test your work by visiting both in the browser
 */

/**
 * La funzione listen permette al server di rimanere in 
 * ascolto su una data porta.
 * L'altro argomento che passiamo alla funzione listen
 * è una funzione di callback che verrà eseguita nel momento in cui
 * il server è attivo e in esecuzione.
 * Andare sulla pagina http://localhost:3000/
 */
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})