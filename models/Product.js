const { Schema, default: mongoose } = require("mongoose");

var product_schema = new Schema({
   name: {
      type: String,
      required: true,
      lowercase:true,
      maxLength:255
   },
   title: {
      type: String,
      required: false,
   },
   price: {
      type: Number,
      default: 0,
   },
   qty_available: {
      type: Number,
      default: 0,
      required: true,
   },
});

module.exports = mongoose.model("products", product_schema);
