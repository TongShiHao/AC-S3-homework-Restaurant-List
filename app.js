const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantsList = require('./restaurant.json')
const port = 3000
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connecting!')
})

const restaurants = require('./models/restaurant')

app.use(express.static('public'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantsList.results })
})

app.get('/restaurants/:restaurants_id', (req, res) => {
  const restaurant = restaurantsList.results.filter(function (restaurant) {
    return restaurant.id == req.params.restaurants_id
  })
  res.render('show', { restaurant: restaurant[0] })
})

app.get('/search', (req, res) => {
  console.log('query.keyword', req.query.keyword)
  const restaurants = restaurantsList.results.filter(function (restaurants) {
    return restaurants.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: req.query.keyword })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})