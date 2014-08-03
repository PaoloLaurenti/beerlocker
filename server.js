// Load required packages
var express = require('express');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');
var http = require('http');
var db = require('./models');

// Create our Express application
var app = express();

app.set('port', process.env.PORT || 3000)

// Use the body-parser package in our application
app.use(bodyParser());

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /beers
router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

db
    .sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0')
    .then(function () {
        db
            .sequelize
            .sync({ force: true })
            .complete(function (err) {
                if (err) {
                    throw err
                } else {
                    db
                        .sequelize
                        .query('SET FOREIGN_KEY_CHECKS = 1')
                        .then(function () {
                            http.createServer(app).listen(app.get('port'), function () {
                                console.log('Express server listening on port ' + app.get('port'))
                            });
                        }, function (err) {
                            throw err
                        });
                }
            });
    }, function (err) {
        throw err
    });