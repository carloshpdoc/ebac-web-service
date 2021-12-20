const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const morgan = require('morgan')
const cors = require('cors')
const homeData = require('./data.json')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(morgan('dev'))

app.listen(process.env.PORT || 8080, (error) => {
    if (error) throw error
    console.log('Server running in http://127.0.0.1:8080')
})

app.get('/', (req, res) => {
    res.send('Hosting Successfully!')
})

app.get('/home', (req, res) => {
    res.status(200).json({ home: homeData })
})

app.post('/login', (req, res) => {
    var user_name = req.body.user;
    var password = req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("yes")
})