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
        .findAll({where: {userId: req.user.id}})
        .then(function (beers) {
            res.send(beers);
        }, function (error) {
            res.send(error);
        });
};

// Create endpoint /api/beers/:beer_id for GET
exports.getBeer = function (req, res) {
    db.Beer
        .find({where: {userId: req.user.id, id: req.params.beer_id }})
        .then(function (beer) {
            res.send(beer);
        }, function (error) {
            res.send(error);
        });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putBeer = function (req, res) {
    db.Beer
        .find({where: {userId: req.user.id, id: req.params.beer_id }})
        .then(function (beer) {
            if (!beer)
                res.status(404).send('Not found');

            beer.quantity = req.body.quantity;
            beer.save();
            res.send(beer);
        }, function (err) {
            res.send(err);
        });
};

// Create endpoint /api/beers/:beer_id for DELETE
exports.deleteBeer = function (req, res) {
    db.Beer
        .find({where: {userId: req.user.id, id: req.params.beer_id }})
        .then(function (beer) {
            if (!beer)
                res.status(404).send('Not found');

            beer
                .destroy()
                .then(function () {
                    res.json({ message: 'Beer removed from the locker!' });
                }, function (err) {
                    res.send(err);
                });
        }, function (error) {
            res.send(error);
        });
};