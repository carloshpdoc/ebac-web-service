const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const morgan = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const homeData = require('./data.json')

// habilitar upload do arquivo
app.use(fileUpload({
    createParentPath: true
}))

app.use(bodyParser.urlencoded({limit: '5mb', extended: false }))
app.use(bodyParser.json({limit: '5mb'}))
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

const increment = function () {
    counter ++
    setTimeout(increment, 1000)
}

var maxAge = 4

// increment()

var counter = 0

app.get('/cache', (req, res) => {
    console.log(`Counter: ${counter}, request cache policy: ${req.headers['cache-policy']}`)
    
    res.set('Cache-Control', `public, max-age=${maxAge}`)
    res.set(`Etag`, `${Math.floor(counter / 2 )}`)
    res.send(`Counter: ${counter}`)
})

app.post("/upload", async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: 400,
                message: 'No file uploaded'
            })
        } else {
            let photo = req.files.photo;

            photo.mv('./uploads/' + photo.name);

            res.send({
                status: 200,
                message: "Upload feito com sucesso",
                mimetype: photo.mimetype,
                size: photo.size
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get('/download/:name', function(req, res) {
    const name = req.params.name;
    const file = `${__dirname}/uploads/${name}`;
    res.download(file);
})