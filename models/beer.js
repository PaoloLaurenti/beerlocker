module.exports = function (sequelize, DataTypes) {
    var Beer = sequelize.define('Beer', {
        name: {type: DataTypes.STRING, allowNull: false},
        type: DataTypes.STRING,
        quantity: DataTypes.INTEGER
    }, {
        associate: function (models) {
            Beer.belongsTo(models.User, {foreignKeyConstraint: true});
        }
    })

    return Beer;
}