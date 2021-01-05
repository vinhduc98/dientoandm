import {Model,BuildOptions} from 'sequelize';
export interface IRoom extends Model  {
    id: number;
    name: string;
}

type IRoomStatic = typeof Model & (new (values?: object, options?: BuildOptions) => IRoom)

export default (sequelize:any, Sequelize:any)=>{
    const room = sequelize.define('room',{
        id:{
            primaryKey:true,
            type: Sequelize.INTEGER,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull: false
        }
    }) as IRoomStatic;
    return room;
}