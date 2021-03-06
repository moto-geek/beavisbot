module.exports = function (sequelize, DataTypes) {
    var Karma = sequelize.define('Karma', {
        id: {type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true},
        type: {type: DataTypes.STRING, allowNull: false},
        details: {type: DataTypes.TEXT}
    }, {
        underscored: true,
        tableName: 'karmas',
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });

    return Karma;
}