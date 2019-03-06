const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (mail, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //by mail
            const user = await User.findOne({ mail });

            //match
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(!isMatch) throw 'Password no match';
                resolve(user);
             });

        } catch (err) {
            reject('Fail');
        }

    });


};