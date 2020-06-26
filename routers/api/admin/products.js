//get post put delete
const {Product} = require('../../../models');
const bcrypt = require("bcryptjs");
const errors = require("restify-errors");

const productRoute = (app) => {
    app.get('/api/admin/products', async (req, res, next)=> {
        const products = await Product.find({});
        res.send(products);
        next();
    });

    // add product
    app.post('/api/admin/products',async(req, res, next) => {
        try {
            const product = new Product(req.body);
            const productSave = await product.save();
            res.send(productSave);
        } catch (err) {
            res.send(new errors.InternalServerError(err));
        }
        next();
    });

    // get single product by id
    app.get('/api/admin/products/:id', async(req, res, next) => {
        try {
            const {id} = req.params;
            const productRet = await Product.findById(id);
            res.send(productRet);
        } catch (err) {
            res.send(new errors.ResourceNotFoundError(err));
        }
        next();
    });

    // update product by id
    app.put('/api/admin/products/:id', async(req, res, next) => {
        try {
            const {id} = req.params;
            const updateRet = await Product.findByIdAndUpdate(id, req.body);
            res.send(updateRet);
        } catch (err) {
            res.send(new errors.ResourceNotFoundError(err));
        }
        next();
    });

    // delete product by id
    app.del('/api/admin/products/:id', async(req, res, next) => {
        try {
            const {id} = req.params;
            const delRet = await Product.findByIdAndDelete(id);
            res.send(delRet);
        } catch (err) {
            res.send(new errors.InternalServerError(err));
        }
        next();
    });
};

module.exports = productRoute;