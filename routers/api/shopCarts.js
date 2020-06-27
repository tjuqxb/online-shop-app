const errors = require('restify-errors');
const {ShopCart} = require('../../models');
const jwt = require('jsonwebtoken');

const shopCartRoute =  (app) => {
    app.get('/api/shop_carts', async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];// retrieve token
            const decoded = jwt.verify(token, 'placeHolder');
            const {userId} = decoded;
            const shopCarts = await ShopCart.find({user: userId});
            res.send(shopCarts);
        }catch (err) {
            res.send(new errors.InternalServerError(err));
        }
    });

    app.post('/api/shop_carts', async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'placeHolder');
            const {userId} = decoded;
            const {product} = req.body;
            const shopCart = await ShopCart.findOneAndUpdate({user: userId, product: product},
                {$inc: {quantity: 1}}, // increase by 1
                {upsert: true}); // not exist, create one
            res.send({
                code: 'success',
                message: 'add to shop cart successfully'
            });
        } catch (err) {
            res.send(new errors.InternalServerError(err));
        }
    })
};

module.exports = shopCartRoute;