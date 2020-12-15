"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const account = sequelize.define('account', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pwd: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: Sequelize.DATE,
            defaultValue: new Date()
        },
        sex: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        }
    }, { indexes: [{ unique: true, fields: ['username'] }] });
    return account;
};
//# sourceMappingURL=account.model.js.map