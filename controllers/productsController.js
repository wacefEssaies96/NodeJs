var products = require('../assets/products.json')

exports.getProducts = () => {
    res.send(products);
}

exports.getProductsById = () => {
    res.send(products[req.params.id]);
}

exports.getProductsByIdAndQt = (req, res) => {
    res.send({
        id: products[req.params.id].name,
        qt: req.params.qt,
        unit_price: products[req.params.id].price,
        total_price: req.params.qt * products[req.params.id].price
    });
};

exports.inStock = (req, res) => {
    var response = []
    for (const key in products) {
        if (products[key].stock >= req.params.qt)
            response.push(products[key])
    }
    res.send(
        response
    );
};