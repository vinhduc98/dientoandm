"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const account = sequelize.define('account', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pwd: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        createDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, { timestamps: false });
    return account;
};
//# sourceMappingURL=account.model.js.map