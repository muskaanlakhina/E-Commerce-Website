const express = require('express')
const UserController = require("../controllers/UserController")
const { is_authenticated } = require("../middlewares/auth")

const router = express.Router()


router.get("/login",UserController.redirect_to_login)
router.post("/login",UserController.login)
router.get("/signup",UserController.redirect_to_signup)
router.post("/signup",UserController.signup)
router.get("/logout",UserController.logout)

module.exports = router