const restify = require("restify");


const  mongoose = require("mongoose");
const  User = require("./models/user");

const app = restify.createServer();

app.use(restify.plugins.bodyParser());

app.get("/", (req, res, next) => {
    res.send(200, {
        code: "success",
        message: "connected!"
    });
    next();
});


require('./routers/api/admin/users')(app); // import user resource router


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


