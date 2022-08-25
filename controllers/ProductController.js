const Product = require("../models/Product");

exports.getProducts = async (request, response) => {
  await Product.find({})
    .sort("price")
    .then((data, err) => {
      if (!err) {
        response.render("product/index", {
          data: data,
          messages: request.flash('message')
        });
      }
    });
};

