'use strict';

module.exports = function (sequelize, DataTypes) {
    var borrow = sequelize.define('borrow', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date_collected: {
            type: DataTypes.DATE,
            allowNull: false
        },

        date_returned: {
            type: DataTypes.DATE
        },

        date_due: {
            type: DataTypes.DATE,
            allowNull: false
        },

        returned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function associate(models) {
                borrow.belongsTo(models.book, {
                    foreignKey: "bookId"
                });
                borrow.belongsTo(models.users, {
                    foreignKey: "userId"
                });
            }
        }
    });
    return borrow;
};