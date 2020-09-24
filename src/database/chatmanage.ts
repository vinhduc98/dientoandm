import {Sequelize} from "sequelize";
import {dbChat} from "../config/db.config";
import Account from "../models/account.model";

const sequelize = new Sequelize(dbChat.DB, dbChat.USER, dbChat.PASSWORD,{
    host: dbChat.HOST,
    dialect:"mysql",
    pool:{
        max: dbChat.pool.max,
        min:dbChat.pool.min,
        acquire:dbChat.pool.acquire,
        idle:dbChat.pool.idle
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