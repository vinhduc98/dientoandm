import {Model, BuildOptions} from 'sequelize';
export interface IComment extends Model{
    id?:number,
    rating:number,
    comment:string,
    author:string
}

type ICommentStatic = typeof Model & (new (values?:object, options?:BuildOptions)=>IComment)

export default (sequelize:any, Sequelize:any)=>{
    const cmt = sequelize.define('comment',{
        id:{
            primaryKey:true,
            type: Sequelize.INTEGER,
            autoIncrement:true
        },
        rating:{
            type: Sequelize.DOUBLE,
            defaultValue:1
        },
        comment:{
            type:Sequelize.STRING,
            allowNull: false
        },
        author:{
            type:Sequelize.STRING,
            allowNull: false
        }
    }) as ICommentStatic;

    return cmt;
}