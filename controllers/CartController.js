'use strict'

const Product = require("../models/Product");
const {calculateOrderTotal} = require("../util/index")

exports.redirect_to_cart = (req,res) => {
  let data , net_amt ;
  
  if (req.session.cart != undefined) {
    data =  req.session.cart  
    net_amt = data.reduce(calculateOrderTotal,0)
  }
  else{
    data = [],
    net_amt = 0
  }
  return res.render("cart/cart",{
    data:data,
    net_amt: net_amt 
  })
}

exports.addToCart = async (req, res) => {
  const product_id = req.query.p;
  await Product.findOne({ _id: { $eq: product_id } }).then((data, err) => {
    if (!err) {
      if (!req.session.cart) 
      {
        req.session.cart = new Array();
        req.session.cart.push({
          id: product_id,
          name: data.name,
          qty: 1,
          price: data.price,
          discount_amt: 0,
          net_total: 1 * data.price,
          img: null,
          qty_available:data.qty_available
        });
      } else {
        // array
        let cart = req.session.cart;
        var newItem = true;
        let is_product_previously_added = cart.find((element) => {
          if (element.id == product_id) {
            newItem = false;
            element.qty = element.qty + 1;
            element.net_total = element.price * element.qty;
            return true;
          }
          return false;
        });
        if (newItem == true) {
          cart.push({
            id: product_id,
            name: data.name,
            qty: 1,
            price: data.price,
            discount_amt: 0,
            net_total: 1 * data.price,
            img: null,
            qty_available:data.qty_available
          });
          req.session.cart = cart;
        }
      }
      req.flash("message", "Item added to cart");
      res.redirect("/");
    } else {
      console.log("Product cannot be added to cart !");
      req.flash("warning", "Item cannot added !!.");
    }
  });
};

exports.remove = (req,res) => {
  if (req.session.cart != undefined && req.session.cart.length != 0) {
    // cart has a items
    const param = req.query.q
    let data = req.session.cart    
    
    const getIndex = (element) => {
       if (element.id == param){
        return data.indexOf(element)
       }
    } 
    const removingElementIndex = data.map(getIndex)
    data.splice(removingElementIndex,1)
    req.session.cart = data
    if (req.session.cart.length == data.length){
      console.log("Item successfully removed")
    }
    else{
      console.log('Error!!')
    }
    res.redirect("/cart/cart")
  }
  else{
    console.log('Cart is empty !')
    res.redirect("/")
  }
}

exports.update_qty = (req,res) => {
  const item = req.query.item
  const new_qty = req.query.qty
  let data = req.session.cart

  const getItemIndex = (element) => {
    if (element.id == item){
      return data.indexOf(element)
    }
  }
  const item_index = data.map(getItemIndex)
  data[item_index].qty = new_qty
  data[item_index].net_total = new_qty * data[item_index].price
  req.session.cart = data
  console.log('Quantity updated !')
  res.redirect("/cart/cart")
}


