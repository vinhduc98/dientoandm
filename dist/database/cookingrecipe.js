"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = require("../config/db.config");
const account_model_1 = __importDefault(require("../models/account.model"));
const dish_model_1 = __importDefault(require("../models/dish.model"));
const comment_model_1 = __importDefault(require("../models/comment.model"));
const img_model_1 = __importDefault(require("../models/img.model"));
const dishimg_model_1 = __importDefault(require("../models/dishimg.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
const sequelize = new sequelize_1.Sequelize(db_config_1.dbcookingrecipe.DB, db_config_1.dbcookingrecipe.USER, db_config_1.dbcookingrecipe.PASSWORD, {
    host: db_config_1.dbcookingrecipe.HOST,
    dialect: "mysql",
    pool: {
        max: db_config_1.dbcookingrecipe.pool.max,
        min: db_config_1.dbcookingrecipe.pool.min,
        acquire: db_config_1.dbcookingrecipe.pool.acquire,
        idle: db_config_1.dbcookingrecipe.pool.idle,
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
    Account: account_model_1.default(sequelize, sequelize_1.Sequelize),
    Dish: dish_model_1.default(sequelize, sequelize_1.Sequelize),
    Comment: comment_model_1.default(sequelize, sequelize_1.Sequelize),
    Img: img_model_1.default(sequelize, sequelize_1.Sequelize),
    DishImg: dishimg_model_1.default(sequelize, sequelize_1.Sequelize),
    Token: token_model_1.default(sequelize, sequelize_1.Sequelize)
};
// Map quan hệ giữa Account và Dish
db.Dish.belongsTo(db.Account);
db.Account.hasMany(db.Dish);
// Map quan hệ giữa Dish và Comment
db.Comment.belongsTo(db.Dish);
db.Dish.hasMany(db.Comment);
// Map quan hệ giữa Dish và img
db.Dish.belongsToMany(db.Img, {
    through: "DishImg",
    timestamps: false,
});
exports.default = db;
//# sourceMappingURL=cookingrecipe.js.map