import {Sequelize} from "sequelize";
import {dbcookingrecipe} from "../config/db.config";
import Account from "../models/account.model";
import Dish from "../models/dish.model";
import Comment from "../models/comment.model";
import Img from "../models/img.model";
import DishImg from "../models/dishimg.model";
import Token from "../models/token.model"

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
    Token:Token(sequelize,Sequelize)
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

export default db;