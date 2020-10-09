import {Sequelize} from "sequelize";
import {dbcookingrecipe} from "../config/db.config";
import Account from "../models/account.model";
import Dish from "../models/dish.model";
import Comment from "../models/comment.model";
import Img from "../models/img.model";
import DishImg from "../models/dishimg.model";
import Token from "../models/token.model";
import Favorite from "../models/favorite.model";
import Permission from "../models/permission.model";
import Notify from "../models/notify.model";

const sequelize = new Sequelize(dbcookingrecipe.DB, dbcookingrecipe.USER, dbcookingrecipe.PASSWORD,{
    host: dbcookingrecipe.HOST,
    dialect:"mysql",
    pool:{
        max: dbcookingrecipe.pool.max,
        min:dbcookingrecipe.pool.min,
        acquire:dbcookingrecipe.pool.acquire,
        idle:dbcookingrecipe.pool.idle,
    },
    define:{
        charset: "utf8",
        collate: "utf8_general_ci",
    },
    logging: false
});

const db ={
    sequelize,
    Sequelize,
    Account:Account(sequelize,Sequelize),
    Dish:Dish(sequelize,Sequelize),
    Comment:Comment(sequelize,Sequelize),
    Img:Img(sequelize,Sequelize),
    DishImg:DishImg(sequelize,Sequelize),
    Favorite:Favorite(sequelize,Sequelize),
    Token:Token(sequelize,Sequelize),
    Permission:Permission(sequelize,Sequelize),
    Notify:Notify(sequelize,Sequelize)
}

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
// Map quan hệ giữa account và dish (làm chức năng favorite)
db.Account.belongsToMany(db.Dish,{
    through: "favorites",
    timestamps:false
})
// Map quan hệ giữa account và notify
db.Notify.belongsTo(db.Account);
db.Account.hasMany(db.Notify);

export default db;