import {Model,BuildOptions} from 'sequelize';
export interface IPermission extends Model  {
    id: number;
    name: string;
}

type IPermissionStatic = typeof Model & (new (values?: object, options?: BuildOptions) => IPermission)

export default (sequelize:any, Sequelize:any)=>{
    const per = sequelize.define('permission',{
        id:{
            primaryKey:true,
            type: Sequelize.INTEGER,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull: false
        }
    }) as IPermissionStatic;
    return per;
}