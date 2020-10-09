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
            defaultValue: ""
        },
        description: {
            type: Sequelize.STRING
        },
        featured: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        commentState: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        category: {
            type: Sequelize.STRING,
            defaultValue: ""
        },
        price: {
            type: Sequelize.DOUBLE,
            defaultValue: 0
        },
    });
    return dish;
};
//# sourceMappingURL=dish.model.js.map