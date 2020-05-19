const  mongoose = require("mongoose");
const  User = require("./models/user");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/shop_app");
const db = mongoose.connection;
db.on("open", async ()=> {
    console.log("connected!");
    const user = new User({
        userName: "test",
        password: "123",
        nickName: "Alex",
        avatar: "/uploads/avatar.jpg"
    });
        const userSave = await user.save();
        console.log(userSave);
});
db.on("error",(error) => {
    console.log("error");
});