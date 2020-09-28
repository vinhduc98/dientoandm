"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const favorite = sequelize.define('favorite', {
        accountId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        dishId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
        }
    }, { timestamps: false });
    return favorite;
};
//# sourceMappingURL=favorite.model.js.map