// Load required packages
var db = require('../models');

// Create endpoint /api/beers for POST
exports.postBeers = function (req, res) {
    db.User
        .find({ where: { id: req.user.id } })
        .then(function (user) {
            db.Beer.create({
                name: req.body.name,
                type: req.body.type,
                quantity: req.body.quantity
            }).then(function (beer) {
                beer.setUser(user)
                    .then(function (beer) {
                        res.json({ message: 'Beer added to the locker!', data: beer });
                    }, function (error) {
                        res.send(error);
                    });
                res.json({ message: 'Beer added to the locker!', data: beer });
            }, function (err) {
                res.send(err);
            })
        },
        function (err) {
            res.send(err);
        });
};

// Create endpoint /api/beers for GET
exports.getBeers = function (req, res) {
    db.Beer
        .findAll({userId: req.user._id})
        .then(function (beers) {
            res.send(beers);
        }, function (error) {
            res.send(error);
        });
};

// Create endpoint /api/beers/:beer_id for GET
exports.getBeer = function (req, res) {
    db.Beer
        .find({userId: req.user._id, _id: req.params.beer_id })
        .then(function (beer) {
            res.send(beer);
        }, function (error) {
            res.send(error);
        });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putBeer = function (req, res) {
    db.Beer
        .update({quantity: req.body.quantity}, {userId: req.user._id, _id: req.params.beer_id})
        .then(function (beer) {
            res.json({ message: num + ' updated' });
        }, function (error) {
            res.send(err);
        });
};

// Create endpoint /api/beers/:beer_id for DELETE
exports.deleteBeer = function (req, res) {

    db.Beer
        .destroy({ userId: req.user._id, _id: req.params.beer_id })
        .then(function (beer) {
            res.json({ message: 'Beer removed from the locker!' });
        }, function (error) {
            res.send(err);
        });
};