import {Sequelize} from "sequelize";
import {dbcookingrecipe} from "../config/db.config";
import Account from "../models/account.model";

const sequelize = new Sequelize(dbcookingrecipe.DB, dbcookingrecipe.USER, dbcookingrecipe.PASSWORD,{
    host: dbcookingrecipe.HOST,
    dialect:"mysql",
    pool:{
        max: dbcookingrecipe.pool.max,
        min:dbcookingrecipe.pool.min,
        acquire:dbcookingrecipe.pool.acquire,
        idle:dbcookingrecipe.pool.idle
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
    Account:Account(sequelize,Sequelize)
}

export default db;