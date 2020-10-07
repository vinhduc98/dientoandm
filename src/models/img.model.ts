import {Model, BuildOptions} from 'sequelize';
export interface IImg extends Model{
    id:number,
    url_img:string,
    createUser:string
}

type IImgStatic = typeof Model & (new (values?:object, options?:BuildOptions)=>IImg)

export default (sequelize:any, Sequelize:any)=>{
    const img = sequelize.define('img',{
        url_img:{
            primaryKey:true,
            type:Sequelize.STRING,
            allowNull: false
        },
        createUser:{
            type:Sequelize.STRING,
            allowNull: false
        }
    }) as IImgStatic;

    return img;
}