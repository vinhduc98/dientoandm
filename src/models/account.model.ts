import {Model, BuildOptions} from 'sequelize';
export interface IAccount extends Model{
    id?:number,
    name:string,
    username:string,
    pwd:string,
    type:number,
    avatar:string,
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
        avatar:{
            type:Sequelize.STRING,
            allowNull: false
        },
        type:{
            type:Sequelize.INTEGER,
            defaultValue:1
        }
    },{indexes:[{unique:true, fields:['username']}]}) as IAccountStatic;

    return account
}