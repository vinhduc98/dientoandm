import {Model, BuildOptions} from 'sequelize';
export interface IAccount extends Model{
    id?:number,
    username:string,
    pwd:string,
    type:number,
    createDate?:Date
}

type IAccountStatic = typeof Model & (new (values?:object, options?:BuildOptions)=>IAccount)

export default (sequelize:any, Sequelize:any)=>{
    const account = sequelize.define('account',{
        id:{
            primaryKey:true,
            type: Sequelize.INTEGER,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull: false
        },
        pwd:{
            type:Sequelize.STRING,
            allowNull:false
        },
        type:{
            type:Sequelize.INTEGER,
            defaultValue:1
        },
        createDate:{
            type:Sequelize.DATE,
            allowNull:false
        }
    },{timestamps: false}) as IAccountStatic;

    return account
}