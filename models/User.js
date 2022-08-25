const {Schema , default:mongoose} = require('mongoose')

var user_schema = Schema({
   f_name:{
      type:String,
      required:false,
      lowercase:true,
      maxLength:255
   },
   l_name:{
      type:String,
      required:false,
   },
   username:{
      type:String,
      required:true,
   },
   password:{
      type:String,
      required:true,
   }
})

module.exports = mongoose.model("users",user_schema)