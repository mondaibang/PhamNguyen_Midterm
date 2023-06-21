let mongoose = require('mongoose');

// create a Model of product
let productModel = mongoose.Schema(
    {
        "name": String,
        "company": String,
        "price": Number
    },
    {
        collection:"product"
    }
);

module.exports = mongoose.model('Product', productModel);