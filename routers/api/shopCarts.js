const errors = require('restify-errors');
const {ShopCart} = require('../../models');

const shopCartRoute =  (app) => {
    app.get('/api/shop_carts', async (req, res, next) => {
        try {
            const userId = '';
            const shopCarts = await ShopCart.find({userId});
        }catch (err) {
            res.send(new errors.InternalServerError(err));
        }
    });

    app.post('/api/shop_carts', async (req, res, next) => {
        try {
            const {user, product} = req.body;
            const shopCart = new ShopCart({
               user,
                product
            });
            const shopCartSave = await shopCart.save();
            res.send(shopCartSave);
        } catch (err) {
            res.send(new errors.InternalServerError(err));
        }
    })
};

module.exports = shopCartRoute;