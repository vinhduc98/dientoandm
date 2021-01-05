import {Model, BuildOptions} from 'sequelize';
export interface IParticipant extends Model{
    accountId:number,
    roomId:number,
    type:string
}

type IParticipantStatic = typeof Model & (new (values?:object, options?:BuildOptions)=>IParticipant)

export default (sequelize:any, Sequelize:any)=>{
    const participant = sequelize.define('participant',{
        accountId:{
            primaryKey:true,
            type:Sequelize.INTEGER,
        },
        roomId:{
            primaryKey:true,
            type:Sequelize.INTEGER,
        },
        type:{
            type:Sequelize.STRING,
            defaultValue:'single'
        }
    },{tableName:'participant'}) as IParticipantStatic;

    return participant;
}