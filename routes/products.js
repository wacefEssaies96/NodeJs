var express = require('express');
var router = express.Router();
var productsController = require('../controllers/productsController')

router.get('/', function (req, res, next) {
    productsController.getProducts(req, res)
});


router.get('/:id', function (req, res, next) {
    productsController.getProductsById(req, res)
});

router.get('/:id/:qt', function (req, res, next) {
    if(req.params.id == 'instock'){
        productsController.inStock(req, res)
    }
    productsController.getProductsByIdAndQt(req, res)
});


module.exports = router;