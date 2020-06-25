//get post put delete
const {User} = require('../../../models');
const bcrypt = require("bcryptjs");
const errors = require("restify-errors");

const usersRoute = (app) => {
    // get all users
    app.get('/api/admin/users', async (req, res, next) => {
        const users = await User.find({});
        res.send(users);
        next();
    });


    // add user
    app.post('/api/admin/users',async(req, res, next) => {
        const userCnt = await User.countDocuments({userName: req.body.userName});
        if (userCnt > 0) {
            res.send({
                code: "error",
                message: "user already exists"
            })
        } else {
            const user = new User(req.body);
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const pwd = bcrypt.hashSync(req.body.password, salt); //encrypt password
            user.password = pwd;
            const userSave = await user.save();
            res.send(userSave);

        }
        next();
    });

    // get single user by id
    app.get('/api/admin/users/:id', async(req, res, next) => {
        try {
            const {id} = req.params;
            const userRet = await User.findById(id);
            res.send(userRet);
        } catch (err) {
            res.send(new errors.ResourceNotFoundError(err));
        }
        next();
    });

    // update user by id
    app.put('/api/admin/users/:id', async(req, res, next) => {
        try {
            const {id} = req.params;
            const updateRet = await User.findByIdAndUpdate(id, req.body);
            res.send(updateRet);
        } catch (err) {
            res.send(new errors.ResourceNotFoundError(err));
        }
        next();
    });

    // delete user by id
    app.del('/api/admin/users/:id', async(req, res, next) => {
        try {
            const {id} = req.params;
            const delRet = await User.findByIdAndDelete(id);
            res.send(delRet);
        } catch (err) {
            res.send(new errors.InternalServerError(err));
        }
        next();
    });
};

module.exports = usersRoute;