var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

// connect ot model
let Product = require("../models/product");


/* GET products listing. */
router.get('/', function(req, res, next) {
    Product.find((err, productList)=>{
        if(err){
            return console.error(err);
        }else {
            //console.log(productList);
            res.render('./product/list', {title: 'Product Info', ProductList: productList})
        }
    });
    
});


// to open add product page
router.get('/add', function(req, res, next) {
    res.render('./product/add', {title: 'Add product'});
})

// to inser product data into mongdb collection
router.post('/add', (req, res, next) => {
    // getting data from form
    //console.log("body: ", req.body);
    let newProduct = Product({
        name: req.body.name,
        company: req.body.company,
        price: req.body.price
    });

    // insert data into the MongoDB
    Product.create(newProduct,(err, data) => {
        if(err) {
            console.log(err);
            res.end(err);
        }else {
            res.redirect('/product');
        }
    });
})

// retrieve data from mongodb and open it in view from
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    Product.findById(id, (err, productToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        } else {
            // write code to display data in view
            res.render('./product/edit',{title: 'Edit Product', product: productToEdit})
        }
    })
})

// write code to store updated data into MongoDB
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedProduct = Product({
        _id : id,
        name: req.body.name,
        company: req.body.company,
        price: req.body.price
    });

    Product.updateOne({_id: id}, updatedProduct, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        } else {
            console.log("edit succes! ");
            res.redirect('/product');
        }
    });
})

// to delete documents from the collection
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    Product.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/product');
        }
    })
})

module.exports = router;
