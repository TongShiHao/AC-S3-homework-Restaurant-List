const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connecting!')
})

const Restaurant = require('./models/restaurant')

app.use(express.static('public'), bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(methodOverride('_method'))

//Routes
app.use('/', require('./routes/homepage'))
app.use('/restaurants', require('./routes/restaurants'))
app.use('/search', require('./routes/search'))


app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})