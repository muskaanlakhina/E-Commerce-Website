const express = require("express")
const OrderController = require("../controllers/OrderController")
const { is_authenticated } = require("../middlewares/auth")

const router = express.Router()

router.get("/place-order",is_authenticated,OrderController.create_order)

module.exports = router