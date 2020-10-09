import {Model, BuildOptions} from 'sequelize';
export interface INotify extends Model{
    id:number,
    content:string,
    state:number,
    createdAt?:Date,
    updatedAt?:Date
}

type INotifyStatic = typeof Model & (new (values?:object, options?:BuildOptions)=>INotify);

export default (sequelize:any, Sequelize:any)=>{
    const notify = sequelize.define('notify',{
        id:{
            primaryKey:true,
            type: Sequelize.INTEGER,
            autoIncrement:true
        },
        content:{
            type: Sequelize.STRING,
            allowNull: false
        },
        state:{
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
    }) as INotifyStatic;

    return notify;
}