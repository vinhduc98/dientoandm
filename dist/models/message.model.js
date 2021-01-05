"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const mess = sequelize.define('message', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        message: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        read: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return mess;
};
//# sourceMappingURL=message.model.js.map