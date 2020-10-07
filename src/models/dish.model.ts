import {Model, BuildOptions} from 'sequelize';
export interface IDish extends Model{
    id?:number,
    name:string,
    image:string,
    category:string,
    label:number,
    price:number,
    featured:boolean,
    description:string,
    createDate?:Date,
    updateDate?:Date,
}

type IDishStatic = typeof Model & (new (values?:object, options?:BuildOptions)=>IDish)

export default (sequelize:any, Sequelize:any)=>{
    const dish = sequelize.define('dish',{
        id:{
            primaryKey:true,
            type: Sequelize.INTEGER,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull: false
        },
        label:{
            type:Sequelize.STRING,
            defaultValue: ""
        },
        description:{
            type:Sequelize.STRING
        },
        featured:{
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        category:{
            type:Sequelize.STRING,
            defaultValue: ""
        },
        price:{
            type: Sequelize.DOUBLE,
            defaultValue:0
        },
    }) as IDishStatic;

    return dish;
}