// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var db = require('../models');

passport.use(new BasicStrategy(
    function (username, password, callback) {
        db.User
            .find({ where: { username: username }})
            .then(function (user) {
                //console.log(user);
                // No user found with that username
                if (!user) {
                    return callback(null, false);
                }

                // Make sure the password is correct
                user.verifyPassword(password, function (err, isMatch) {
                    if (err) {
                        return callback(err);
                    }

                    // Password did not match
                    if (!isMatch) {
                        return callback(null, false);
                    }

                    // Success
                    return callback(null, user);
                });
            }, function (err) {
                return callback(err);
            });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false });