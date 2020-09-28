import {Model, BuildOptions} from 'sequelize';
export interface IFavorite extends Model{
    accountId:number,
    dishId:number
}


type IFavoriteStatic = typeof Model & (new (values?:object, options?:BuildOptions)=>IFavorite)

export default (sequelize:any, Sequelize:any)=>{
    const favorite = sequelize.define('favorite',{
        accountId:{
            primaryKey:true,
            type:Sequelize.INTEGER,
        },
        dishId:{
            primaryKey:true,
            type:Sequelize.INTEGER,
        }
    },{ timestamps: false}) as IFavoriteStatic;

    return favorite;
}