"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const img = sequelize.define('dishimg', {
        dishId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        imgUrlImg: {
            primaryKey: true,
            type: Sequelize.STRING,
        }
    }, { tableName: 'dishimg', timestamps: false });
    return img;
};
//# sourceMappingURL=dishimg.model.js.map