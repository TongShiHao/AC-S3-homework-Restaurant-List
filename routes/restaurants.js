const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

//新增餐廳的頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//新增餐廳
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('detail', { restaurants: restaurant })
  })
})

//修改餐廳資訊的頁面
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('edit', { restaurants: restaurant })
  })
})

//修改餐廳
router.put('/:id', (req, res) => {
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
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.remove(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
})

module.exports = router