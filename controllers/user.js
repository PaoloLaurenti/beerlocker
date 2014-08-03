var db = require('../models')

exports.postUsers = function (req, res) {
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).success(function () {
        res.json({ message: 'New beer drinker added to the locker room!' });
    }).error(function (err) {
        res.send(err);
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function (req, res) {
    db.User
        .findAll()
        .then(function (users) {
            res.send(users);
        }, function (error) {
            res.send(error);
        });
};