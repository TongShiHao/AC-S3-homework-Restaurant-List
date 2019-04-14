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

//取得所有餐廳
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantsList.results })
})

//取得餐廳詳細資料
app.get('/restaurants/:restaurants_id', (req, res) => {
  const restaurant = restaurantsList.results.filter(function (restaurant) {
    return restaurant.id == req.params.restaurants_id
  })
  res.render('show', { restaurant: restaurant[0] })
})

//新增餐廳的頁面
app.get('/restaurants/new', (req, res) => {
  res.render('新增餐廳')
})

//新增餐廳
app.post('/restaurants', (req, res) => {
  res.render('新增一筆餐廳')
})

//修改餐廳資訊的頁面
app.get('/restaurants/:restaurants_id/edit', (req, res) => {
  res.render('修改餐廳')
})

//修改餐廳
app.post('/restaurants/:restaurants_id', (req, res) => {
  res.render('/修改餐廳資訊')
})

//刪除餐廳資訊
app.post('/restaurants/:restaurants_id/delete', (req, res) => {
  res.render('刪除餐廳')
})

//搜尋餐廳
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