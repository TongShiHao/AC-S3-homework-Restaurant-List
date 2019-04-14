const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

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

//取得所有餐廳
app.get('/', (req, res) => {
  Restaurant.find((err, restaurant) => {
    if (err) return console.log(err)
    return res.render('index', { restaurants: restaurant })
  })
})

//新增餐廳的頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//新增餐廳
app.post('/restaurants', (req, res) => {
  const restaurant = Restaurant({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    google_map: req.body.google_map,
    phone: req.body.phone,
    location: req.body.location,
    rating: req.body.rating,
    description: req.body.description,
  })

  restaurant.save(err => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

//取得餐廳詳細資料
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('detail', { restaurants: restaurant })
  })
})

//修改餐廳資訊的頁面
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('edit', { restaurants: restaurant })
  })
})

//修改餐廳
app.post('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.name = req.body.name
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.google_map = req.body.google_map
    restaurant.phone = req.body.phone
    restaurant.location = req.body.location
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description

    restaurant.save(err => {
      if (err) return console.log(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

//刪除餐廳資訊
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.remove(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
})

//搜尋餐廳
app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({
    name: {
      $regex: keyword,
      $options: 'i'
    }
  }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('index', {
      restaurants: restaurant
    })
  })
})


app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})