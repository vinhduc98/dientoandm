import {Model,BuildOptions} from 'sequelize';
export interface IRecipient extends Model  {
    accountId: number;
    messageId: number;
}

type IRecipientStatic = typeof Model & (new (values?: object, options?: BuildOptions) => IRecipient)

export default (sequelize:any, Sequelize:any)=>{
    const re = sequelize.define('recipient',{
        accountId:{
            type: Sequelize.INTEGER,
            primaryKey:true
        },
        messageId:{
            type:Sequelize.INTEGER,
            primaryKey:true
        }
    },{tableName:'recipient'}) as IRecipientStatic;
    return re;
}