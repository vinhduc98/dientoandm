import {Model, BuildOptions} from 'sequelize';
export interface IAccount extends Model{
    id?:number,
    name:string,
    sex:number,
    username:string,
    pwd:string,
    type:number,
    dateOfBirth:Date,
    avatar:string
    state:string
}

type IAccountStatic = typeof Model & (new (values?:object, options?:BuildOptions)=>IAccount)

export default (sequelize:any, Sequelize:any)=>{
    const account = sequelize.define('account',{
        id:{
            primaryKey:true,
            type: Sequelize.INTEGER,
            autoIncrement:true
        },
        username:{
            type:Sequelize.STRING,
            allowNull: false
        },
        pwd:{
            type:Sequelize.STRING,
            allowNull:false
        },
        name:{
            type:Sequelize.STRING,
            allowNull: false
        },
        dateOfBirth:{
            type:Sequelize.DATE,
            defaultValue: new Date()
        },
        sex:{
            type:Sequelize.INTEGER,
            defaultValue:0
        },
        avatar:{
            type:Sequelize.STRING,
            allowNull: false
        },
        type:{
            type:Sequelize.INTEGER,
            defaultValue:1
        },
        state:{
            type:Sequelize.STRING,
            defaultValue:'offline'
        }
    },{indexes:[{unique:true, fields:['username']}]}) as IAccountStatic;

    return account
}