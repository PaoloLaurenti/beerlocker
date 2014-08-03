var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    }, {
        associate: function (models) {
            User.hasMany(models.Beer, {
                foreignKeyConstraint: true
            });
        },
        instanceMethods: {
            verifyPassword: function (candidatePassword, cb) {
                console.log('candidte: ' + candidatePassword + '  - password: ' + this.getDataValue('password'));
                bcrypt.compare(candidatePassword, this.getDataValue('password'), function (err, isMatch) {
                    if (err)
                        return cb(err);
                    cb(null, isMatch);
                });
            }
        },
        hooks: {
            beforeUpdate: CryptPassword,
            beforeCreate: CryptPassword
        }
    });

    function CryptPassword(user, fn) {
        if (!user.changed('password')) return fn();

        bcrypt.genSalt(5, function (err, salt) {
            if (err) return fn(err);

            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) return fn(err);
                user.password = hash;
                fn();
            });
        });
    }

    return User
}