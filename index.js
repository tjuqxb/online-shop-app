const restify = require("restify");


const  mongoose = require("mongoose");
const  User = require("./models/user");

const app = restify.createServer();

app.get("/", (req, res, next) => {
    res.send(200, {
        code: "success",
        message: "connected!"
    });
    next();
});

app.get('/users',async (req, res, next) => {
    const users = await User.find({});
    res.send(users);
    next();
})

app.listen(3005, () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect("mongodb://localhost/shop_app");
    const db = mongoose.connection;
    db.on("open", async ()=> {
        const example = new User({userName: "test", password: "123"});
        const save = await example.save();
        console.log("connected!");
    });
    db.on("error",(error) => {
        console.log("error");
    });

})


