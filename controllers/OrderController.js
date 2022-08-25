'use strict'

const Order = require("../models/Order")
const Product = require("../models/Product")
const {calculateOrderTotal} = require("../util/index")

exports.create_order = async (request,response) => {
   if (request.session.cart.length == 0){
      console.log("Cart is empty.")
      response.redirect("/cart/cart")
   }
   else{
      const data = request.session.cart
      data.map(update_product_qty)
      let order_data = new Array()
      let order_total = 0 
      data.forEach( (element) => {
         const data = {
            item_id: element.id,
            item_name:element.name,
            item_price:element.price,
            total_qty:element.qty,
            total_amt:element.net_total
         }
         order_total = order_total + element.net_total
         order_data.push(data)
      })
      let total_documents = await Order.countDocuments()
      const new_order = new Order({
         user: request.user.data.id,
         order_amt:order_total,
         order_data: order_data,
         order_id:`#ORDER${new Date().getUTCMilliseconds()}${total_documents+1}`  
      })
      await new_order.save().then( (result,err) => {
         if (result){
            console.log("Order has been placed.")
            request.session.cart = undefined
            response.redirect("/")
         }
         else{
            console.log(err)
            response.redirect("/cart/cart")
         }
      })
   }
}

const update_product_qty = async (element) => {
   await Product.findOneAndUpdate({
      _id: { $eq: element.id }
   },{
      qty_available: element.qty_available - element.qty
   },{ 
      returnOriginal:true 
   })
} 
