import {Model,BuildOptions} from 'sequelize';
export interface IToken extends Model  {
    token: string;
    username: string;
    expiredIn:Date
}

type ITokenStatic = typeof Model & (new (values?: object, options?: BuildOptions) => IToken)

export default (sequelize:any, Sequelize:any)=>{
    const token = sequelize.define('token',{
        token:{
            type: Sequelize.STRING,
            primaryKey:true
        },
        username:{
            type:Sequelize.STRING,
            allowNull: false
        },
        expiredIn:{
            type:Sequelize.DATE,
            allowNull: false
        }
    },{timestamps: false}) as ITokenStatic;

    return token;
}