'use strict';

module.exports = function (sequelize, DataTypes) {
    var book = sequelize.define('book', {
        ISBN: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function associate(models) {
                book.hasMany(models.borrow, {
                    foreignKey: "bookId"
                });
            }
        }
    });
    return book;
};