"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const participant = sequelize.define('participant', {
        accountId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        roomId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: 'single'
        }
    }, { tableName: 'participant' });
    return participant;
};
//# sourceMappingURL=participant.model.js.map