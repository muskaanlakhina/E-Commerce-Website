var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get(
  '/info', function(req, res){
      var infoObj = {};//un objeto vacio o un diccionario vacio 
      infoObj.cuenta = "0801199820016";
      infoObj.nombre = "Rolando";
      infoObj.correo = "zrolando1015@gmail.com";
      res.json(infoObj);
  
});
// todas las rutas inician con "/"

router.get(
  '/hook', function(req, res){
      res.render("hook", {});
  }
  );
  router.post(
    '/hook', function(req, res){
        var body = req.body;
        console.log(body);
        res.render("hook", body);
    }
    );
module.exports = router;
