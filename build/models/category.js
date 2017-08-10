'use strict';

module.exports = function (sequelize, DataTypes) {
    var category = sequelize.define('category', {
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function associate(models) {
                // Todo.hasMany(models.TodoItem, {
                //
                //});
            }
        }
    });
    return category;
};