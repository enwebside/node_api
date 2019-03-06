const userFromModel = require('../modules/User');
const config = require('../config');
const errors = require('restify-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../auth');

module.exports = server => {

    //reg user
    server.post('/reg', (req, res, next) => {
        const { mail, password } = req.body;

        const newUser = new userFromModel({
            mail,
            password 
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                //hash
                newUser.password = hash;
                //save
                try {
                    const makeNewUser = await newUser.save();
                    res.send(201);
                    next();
                } catch (err) {
                    return next(new errors.InternalError(err.message));
                }
            });
        });
    });
    // auth
    server.post('/auth', async(req, res, next) => {
        const { mail, password } = req.body;

         
        try {
            //auth user
            const fitte = await auth.authenticate(mail, password);
            //create jwt
            const token = jwt.sign(fitte.toJSON(), config.JWT_SECRET, {
                expiresIn: '15m'
            });

            const { iat, exp } = jwt.decode(token);
            res.send({ iat, exp, token });

            next();
        } catch (err) {
            return next(new errors.UnauthorizedError(err));
        }
    });
};
