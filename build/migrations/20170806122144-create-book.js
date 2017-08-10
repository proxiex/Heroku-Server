'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.createTable('books', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ISBN: {
                type: Sequelize.INTEGER
            },
            bookname: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            publisher: {
                type: Sequelize.STRING
            },
            category: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            details: {
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function down(queryInterface, Sequelize) {
        return queryInterface.dropTable('books');
    }
};