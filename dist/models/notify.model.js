"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const notify = sequelize.define('notify', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
    });
    return notify;
};
//# sourceMappingURL=notify.model.js.map