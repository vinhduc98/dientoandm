"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = require("../config/db.config");
const account_model_1 = __importDefault(require("../models/account.model"));
const sequelize = new sequelize_1.Sequelize(db_config_1.dbChat.DB, db_config_1.dbChat.USER, db_config_1.dbChat.PASSWORD, {
    host: db_config_1.dbChat.HOST,
    dialect: "mysql",
    pool: {
        max: db_config_1.dbChat.pool.max,
        min: db_config_1.dbChat.pool.min,
        acquire: db_config_1.dbChat.pool.acquire,
        idle: db_config_1.dbChat.pool.idle
    },
    define: {
        charset: "utf8",
        collate: "utf8_general_ci",
    },
    logging: false
});
const db = {
    sequelize,
    Sequelize: sequelize_1.Sequelize,
    Account: account_model_1.default(sequelize, sequelize_1.Sequelize)
};
exports.default = db;
//# sourceMappingURL=cookingrecipe.js.map