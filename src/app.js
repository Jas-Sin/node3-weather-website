const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// Path configurations
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // changed from views to templates
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and location of views and partials
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)  

// set up static directory to serve
app.use(express.static(publicDirectoryPath))       //static take path to serve

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Jaskaran Singh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Jaskaran Singh'
    })
})
app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Helping Hands :P',
        name: 'Jaskaran Singh'
    })
})

// app.get('', (req, res) =>{
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name : 'Jaskaran',
//         age : 22
//     },{
//         name: 'Abc'
//     }])
// })


// app.get('/about',(req,res)=>{
//     res.send('<h1>About us</h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {Latitude,Longitude,Location} = {})=>
    {
        if(error)
        {
            return res.send({error})
        }
        forecast(Latitude,Longitude,(error, forecastData)=>
        {
            if(error)
            {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                Location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req,res) => 
{
    if (!req.query.search)
    {
        return res.send({
            error: 'You must provide a search code'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>
{
    res.render('404', {
        title: 'Help Article Not Found',
        errormessage: 'Help Article Not Found',
        name: 'Jaskaran Singh'
    })
})

app.get('*', (req,res)=>
{
    res.render('404', {
        title: '404 ',
        errormessage: 'Unable to find the page you are looking for',
        name: 'Jaskaran Singh'
    })
})
//app.com
//app.com/help

app.listen(port, () =>
{
    console.log('Server is up on port '+ port)
})