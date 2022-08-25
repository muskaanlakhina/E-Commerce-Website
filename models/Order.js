const {Schema, default: mongoose} = require("mongoose")
const uuid = require("uuid")

const order_schema = new Schema({
   order_id:{
      type: String,
      required:true,
      index:true, // Row level index
      unique:true,  
   },
   date:{
      type:Date,
      required:true,
      default: Date.now
   },
   order_amt:{
      type:Number,
      required:true
   },
   order_data:{
      type: [{ 
         item_id: Schema.Types.ObjectId,
         item_name: String,
         item_price: Number,
         total_qty: Number,
         total_amt: Number
      }]
   },
   user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
   }
})

module.exports = mongoose.model( "orders",order_schema )