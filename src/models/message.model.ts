import {Model, BuildOptions} from 'sequelize';
export interface IMessage extends Model{
    id:number,
    message:string,
    read:number
}

type IMessageStatic = typeof Model & (new (values?:object, options?:BuildOptions)=>IMessage)

export default (sequelize:any, Sequelize:any)=>{
    const mess = sequelize.define('message',{
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        message:{
            type:Sequelize.STRING,
            defaultValue:''
        },
        read:{
            type:Sequelize.INTEGER,
            defaultValue:0
        }
    }) as IMessageStatic;

    return mess;
}