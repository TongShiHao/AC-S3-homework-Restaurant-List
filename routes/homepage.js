const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

//取得所有餐廳
router.get('/', (req, res) => {
  Restaurant.find((err, restaurant) => {
    if (err) return console.log(err)
    return res.render('index', { restaurants: restaurant })
  })
})

module.exports = router