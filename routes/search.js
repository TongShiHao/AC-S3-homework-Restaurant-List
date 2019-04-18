const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

//搜尋餐廳
router.get("/", (req, res) => {
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

module.exports = router