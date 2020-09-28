import {Model, BuildOptions} from 'sequelize';
export interface IDishImg extends Model{
    dishId:number,
    url_img:string,
}

type IImgDishStatic = typeof Model & (new (values?:object, options?:BuildOptions)=>IDishImg)

export default (sequelize:any, Sequelize:any)=>{
    const img = sequelize.define('dishimg',{
        dishId:{
            primaryKey:true,
            type:Sequelize.INTEGER,
        },
        imgUrlImg:{
            primaryKey:true,
            type:Sequelize.STRING,
        }
    },{tableName:'dishimg', timestamps: false}) as IImgDishStatic;

    return img;
}