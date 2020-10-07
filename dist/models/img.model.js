"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const img = sequelize.define('img', {
        url_img: {
            primaryKey: true,
            type: Sequelize.STRING,
            allowNull: false
        },
        createUser: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return img;
};
//# sourceMappingURL=img.model.js.map