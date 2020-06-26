const {User} = require('../../models');
const errors = require('restify-errors');
const  bcrypt = require('bcryptjs');

const usersRoute = (app) => {
    app.post('/api/users/login', async (req, res, next) => {
       try {
           const {userName, password} = req.body;
           const user = await User.findOne({userName});
           if (user) {
                //password compare
               const isValidated = bcrypt.compareSync(password, user.password);
                if (isValidated) {
                    res.send(user);
                } else {
                    res.send ({
                       code:'error',
                       message: 'wrong password'
                    });
                }
           } else  {
               res.send({
                   code: 'error',
                   message: 'user not found'
               });
           }
       } catch (err) {
          res.send(new errors.InternalServerError(err));
       }
    });

    app.post('/api/users/reg', async (req, res, next)=> {
        try {
            const {userName} = req.body ;
            const userExist = await User.count({userName: userName});
            if (userExist == 0) {
                const user = new User(req.body);
                const password = user.password;
                // encrypt password
                const salt = bcrypt.genSaltSync(10);
                const pwd = bcrypt.hashSync(password, salt);
                user.password = pwd;
                const userRet = await user.save();
                res.send(userRet);
            } else {
                res.send({
                    code: 'error',
                    message: 'userName already exists'
                })
            }
        } catch (err) {
            res.send(new errors.InternalServerError(err));
        }

    })
};

module.exports = usersRoute;