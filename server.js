const express = require('express')
const app = express()
const homeData = require('./data.json')

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