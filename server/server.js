const express = require('express')
const session = require('express-session')
const path = require('path')

const routes = require('./routes')

const app = express()

// включение политики CORS на требуемые хостинг нашего клиента
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(session({
     secret: 'autoLotSecret',
     saveUninitialized: true,
     resave: true
}))

app.use(express.static(path.join(__dirname, './public')))

// включение bodyParser 
const bodyParser = require("body-parser")
app.use(bodyParser.json())

app.use(express.json())

app.use('/', routes)

const port = 3000

app.listen(port, () => {
    console.log(`Server boot on port ${port}...`)
})