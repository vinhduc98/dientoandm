"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const cmt = sequelize.define('comment', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        rating: {
            type: Sequelize.DOUBLE,
            defaultValue: 1
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            defaultValue: "Ẩn danh"
        },
    });
    return cmt;
};
//# sourceMappingURL=comment.model.js.map