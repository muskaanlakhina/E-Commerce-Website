const express = require('express');
const { is_authenticated  } = require("../middlewares/auth")
const ProductController = require("../controllers/ProductController")

const router = express.Router()

router.get("/",ProductController.getProducts)

module.exports = router