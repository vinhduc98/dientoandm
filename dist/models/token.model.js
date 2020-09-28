"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const token = sequelize.define('token', {
        token: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expiredIn: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, { timestamps: false });
    return token;
};
//# sourceMappingURL=token.model.js.map