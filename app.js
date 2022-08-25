require("dotenv").config()
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const express_session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const body_parser = require('body-parser')

const {auth} = require("./middlewares/auth")

const route_product = require("./routes/products")
const route_cart = require("./routes/cart")
const route_user = require("./routes/user")
const route_order = require("./routes/order")

const app = express();
const PORT = process.env.PORT || 3000;

// setting up the views folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set the static files directory
app.use(express.static(path.join(__dirname, "public")));

// setting up the express session.
app.use(express_session({
   secret:'my secret',
   resave:false,
   saveUninitialized: true,
   store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName:'sessions'
   }),
   cookie:{
      maxAge: 1000 * 24 * 60 * 60
   }
}))

// Register a middleware for flash messages
app.use(flash());

// Register a auth middleware
app.use(auth)

app.use(express.json())

// Register a locals 
app.use( (request,response,next) => {
   response.locals.is_user_loggedIn = request.user != null ? true : false
   next()
})

app.use(body_parser.urlencoded({extended:true}))

// Register the routes .
app.use("/",route_product);
app.use("/cart",route_cart);
app.use("/user",route_user)
app.use("/order",route_order)
// MONGO DB connection.
mongoose
   .connect(process.env.MONGO_URI , {
      useNewURLParser: true
   })
   .then(() => {
      app.listen(PORT, "localhost", (req, res) => {
         console.log(`Node Server started at http://localhost:${PORT}`);
      });
   });
