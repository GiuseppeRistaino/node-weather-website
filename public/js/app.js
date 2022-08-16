console.log('Client side javascript is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
//Se vogliamo recuperare un selector in base all'ID usiamo #
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From Javascript'

/**
 * Goal:Render content to paragraphs
 * 
 * 1. Select the second message p from Javascript
 * 2. Just before fetch, render loading message and empty
 * 3. If error, render error
 * 4. If no error, render location and forecast
 * 5. Test your work! Search for errors and for valid locations
 */

/**
 * Nel caso in cui questo file js venga caricato prima che il body
 * dell'html sia eseguito verrà visualizzato un errore in console:
 * Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
 */
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()  //questa funzione permette di non far refreshare la pagina e quindi il messaggio di testing qui sotto  non scomparirà immediatamente
    
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            }
            else {
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
    
    //console.log('testing!') //questo messaggio comparirà molto velocemente perchè il broser verrà riaggiornato una volta eseguito
    //console.log(location)

})

/**
 * Goal: Use input value to get weather
 * 
 * 1. Migrate fetch call into the submit callback
 * 2. Use the search text as the address query string value
 * 3. Submit the form with a valid and invalid value to test
 */
