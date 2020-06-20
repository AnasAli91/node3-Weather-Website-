const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public ')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views locations 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup handlebars engine and views 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anas'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anas'
    })
})

app.get('/help', (req,res) => {
    res.render('Help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Anas'
    })
})

app.get('/help', (req,res) => {
    const helpFile = path.join(__dirname, '../public /help.html')
    res.sendfile(helpFile)
})


app.get('/about', (req,res) => {
    const aboutFile = path.join(__dirname, '../public /about.html')
    res.sendfile(aboutFile)
})

app.get('/weather', (req,res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'Please provide an address '
        })
    } else {
        geocode(address, (error, { latitude, longitude, location } = {})=> {
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address
                })
            })
        })
    }
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anas',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not Found.',
        name: 'Anas'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})


