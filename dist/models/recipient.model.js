"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const re = sequelize.define('recipient', {
        accountId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        messageId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, { tableName: 'recipient' });
    return re;
};
//# sourceMappingURL=recipient.model.js.map