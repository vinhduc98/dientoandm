import db from '../database/cookingrecipe'
import {ErrorGeneral} from '../description/description';
export class DishController{
    async createDish(req:any, res:any, next:any){
        try {
            const body =req.body;
            let createDish = await db.Dish.create({
                name:body.name,
                label:body.label,
                featured:body.featured,
                category:body.category,
                price:body.price,
                img:body.img,
                description:body.description,
                accountId:body.accountId
            })

            const img:any =body.img;

            if(img.length>0)
            {
                for(let i=0;i<img.length;i++)
                {
                    let getImg= await db.Img.findOne({
                        where:{
                            url_img:img[i]
                        }
                    })
                    if(getImg===null)
                    {
                        return res.status(200).send({
                            status:0,
                            description:'Hình ảnh chưa được cập nhật lên server - yêu cầu kiểm tra lại'
                        })
                    }
                    else{
                        const id = createDish.getDataValue('id');
                        let createDishimg = await db.DishImg.create({
                            dishId:id,
                            imgUrlImg:img[i]
                        })
                    }
                }
            }
            return res.status(200).send({
                status:1,
                description:'Ok'
            })
        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }
    }

    async getAllDish(req:any, res:any, next:any){
        try {
            let getAlldish:any;
            let dishes:any=[];
            let dish:any={};
            getAlldish=await db.Dish.findAll({
                include:{model:db.Comment,attributes:['author','rating','comment']},
                order:[['updatedAt','DESC']]
            });

            for(let i=0;i<getAlldish.length;i++)
            {
                dish ={
                    id:getAlldish[i].id,
                    name:getAlldish[i].name,
                    label:getAlldish[i].label,
                    description:getAlldish[i].description,
                    featured:getAlldish[i].featured,
                    category:getAlldish[i].category,
                    price:getAlldish[i].price,
                    accountId:getAlldish[i].accountId,
                    imgs:[]
                };

                let listimg = await db.DishImg.findAll({where:{
                    dishId:getAlldish[i].id
                }})
                for(let m=0;m<listimg.length;m++)
                {
                    dish.imgs.push(listimg[m].getDataValue('imgUrlImg'));
                }
                if(dishes.indexOf(dish)<=-1)
                {
                    dishes.push(dish);
                }
            }
            return res.status(200).send({
                status:1,
                description:"Ok",
                dishes
            })
        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }
    }
}