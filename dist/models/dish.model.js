"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const dish = sequelize.define('dish', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        label: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ""
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        featured: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ""
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
    });
    return dish;
};
//# sourceMappingURL=dish.model.js.map