const is_authenticated = (req,res,next) => {
   if (req.user != null){
      next()
   }
   else{
      res.redirect("/user/login")  // login page.
   }
}


const auth = (req,res,next) => {
   if (req.session.authentication != undefined) {
      req.user = req.session.authentication
   }
   else{
      req.user = null
   }
   next();
}

module.exports = {
   auth:auth,
   is_authenticated:is_authenticated
}