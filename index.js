const restify = require("restify");
const  mongoose = require("mongoose");
const  User = require("./models/user");
const rjc = require('restify-jwt-community');

const app = restify.createServer();

app.use(restify.plugins.bodyParser());

const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
    origins: ["*"],
});

app.pre(cors.preflight);
app.use(cors.actual);

app.use(rjc({secret: 'placeHolder'}).unless({
    path:['/api/users/login','/api/users/reg','/api/products', new RegExp('/admin/*')]
}));

app.get("/", (req, res, next) => {
    res.send(200, {
        code: "success",
        message: "connected!"
    });
    next();
});


require('./routers/api/admin/users')(app); // import user resource router
require('./routers/api/admin/products')(app); // import product resource router
require('./routers/api/products')(app);
require('./routers/api/users')(app);
require('./routers/api/shopCarts')(app);

app.listen(3005, () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect("mongodb://localhost/shop_app");
    const db = mongoose.connection;
    db.on("open", async ()=> {
        console.log("connected!");
    });
    db.on("error",(error) => {
        console.log("error");
    });

})


