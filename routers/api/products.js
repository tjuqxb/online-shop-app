const {Product} = require('../../models');
const errors = require('restify-errors');

const productRoute = (app) => {
    app.get('/api/products',async (req, res, next) => {
        const products = await Product.find({});
        res.send(products);
        next();
    });

}

module.exports = productRoute;