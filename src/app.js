const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const weather=require('./utils/weather')
    

const app = express();
const port = process.env.PORT || 3000
//configureation handlerbar and view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

//use static files
app.use(express.static(path.join(__dirname, "../public")))

//Route to home page
app.get('', (req, res) => {
    res.render('index',{title:"Weather Applicatiton"})
})

app.get('/weather', (req, res) => {
    if (!req.query.address)
    {
        return res.send({error:"Address is require"})
        
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({error:error})
        }
        weather(latitude, longitude, (error, temprature) => {
            if (error) {
                return res.send({error:error})
            }

            res.send({
                temprature,
                address : location
            })

        })
    })
})

//404 page setup
app.get('*', (req,res) => {
    res.send("404 page not found")
})

//start app at 3000 port number
app.listen(port, () => {
    console.log('server is up on port 3000')
})

