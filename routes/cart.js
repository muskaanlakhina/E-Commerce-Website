const express = require('express')
const CartController = require("../controllers/CartController")
const { is_authenticated } = require("../middlewares/auth")

const router = express.Router()

router.get('/add_to_cart',is_authenticated,CartController.addToCart)
router.get('/cart',CartController.redirect_to_cart)
router.get("/remove-item",CartController.remove)
router.get("/update_qty",CartController.update_qty)

module.exports = router