import db from '../database/cookingrecipe'
import {ErrorGeneral} from '../description/description';
import {FunctionHandle} from '../functionManage/destroyfilecloudinary';
import {img} from '../config/defaultimg.config';
import fs from 'fs';

export class DishController{
    async createDish(req:any, res:any, next:any){
        const body =req.body;
        const jwt = req.jwtPayLoad;
        let transaction = await db.sequelize.transaction();
        try {
            let createDish = await db.Dish.create({
                name:body.name,
                label:body.label,
                featured:body.featured,
                category:body.category,
                price:body.price,
                imgs:body.imgs,
                description:body.description,
                commentState:1,
                accountId:jwt.id
            })

            const imgs:any =body.imgs;

            if(imgs.length>0)
            {
                for(let i=0;i<imgs.length;i++)
                {
                    let getImg= await db.Img.findOne({
                        where:{
                            url_img:imgs[i]
                        },transaction
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
                            imgUrlImg:imgs[i]
                        },{transaction})
                    }
                }
            }
            transaction.commit();
            return res.status(200).send({
                status:1,
                description:'Ok'
            })
        } catch (error) {
            if(transaction)
            {
                transaction.rollback();
            }
            ErrorGeneral(error,200,req,res,next);
        }
    }

    async getAllDish(req:any, res:any, next:any){
        try {
            let getAlldish:any;
            let dishes:any=[];
            let dish:any={};
            getAlldish=await db.Dish.findAll({
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
                    imgs:[],
                    // comments:[],
                    commentState:getAlldish[i].commentState,
                    createdDate:getAlldish[i].createdAt
                };

                let listimg = await db.DishImg.findAll({where:{
                    dishId:getAlldish[i].id
                }});

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

    async updateDish(req:any, res:any, next:any){
        let dishId = req.params.dishId;
        let jwtPayLoad = req.jwtPayLoad;
        let body =req.body;
        let transaction = await db.sequelize.transaction();
        try {
            await db.Dish.update({
                name:body.name,
                label:body.label,
                description:body.description,
                featured:body.featured,
                category:body.category,
                commentState:body.commentState,
                price:body.price,
            },{
                where:{
                    id:dishId
                },transaction
            })
            let imgs = body.imgs;
            if(img!==undefined)
            {
                let arrDishImg:any =[];
                let imgDish:any = await db.DishImg.findAll({
                    where:{
                        dishId
                    }
                })

                // Xóa hết danh sách DishImg
                await db.DishImg.destroy({
                    where:{
                        dishId
                    },transaction
                })
                if(imgs.length>=0)
                {
                    for(let i=0;i<imgDish.length;i++)
                    {
                        // Nếu imgDish không nằm trong imgs
                        if(imgs.indexOf(imgDish[i].imgUrlImg)<=-1)
                        {
                            // Xóa tất cả các img cũ
                            await db.Img.destroy({
                                where:{
                                    url_img:imgDish[i].imgUrlImg
                                },transaction
                            })
                            // Xóa tất của các DishImg cũ
                            await db.DishImg.destroy({
                                where:{
                                    imgUrlImg:imgDish[i].imgUrlImg
                                },transaction
                            })
                            // Xóa file img
                            fs.unlinkSync("uploads/"+imgDish[i].imgUrlImg)
                        }
                    }
                    // Lấy lại danh sách ImgDish sau khi đã thanh lọc
                    let imgDishSub =  await db.DishImg.findAll({
                        where:{
                            dishId
                        }
                    })

                    for(let k =0;k<imgDishSub.length;k++)
                    {
                        arrDishImg.push(imgDishSub[k]);
                    }
                    // imgDishSub.forEach(async(element:any) => {
                    //     arrDishImg.push(element.imgUrlImg)
                    // });


                    for(let j =0;j<imgs.length;j++)
                    {
                        if(arrDishImg.indexOf(imgs[j])<=-1)
                        {
                            await db.DishImg.create({
                                dishId,
                                imgUrlImg:imgs[j]
                            },{transaction})
                        }
                    }
                }
            }
            transaction.commit();
            return res.status(200).send({
                status:1,
                description:"Ok",
            })

        } catch (error) {
            if(transaction)
            {
                transaction.rollback();
            }
            ErrorGeneral(error,200,req,res,next);
        }
    }

    async deleteDish(req:any, res:any, next:any){

        let dishId = req.params.dishId;
        let transaction = await db.sequelize.transaction();
        try {
            let destroyDish = await db.Dish.destroy({
                where:{
                    id:dishId
                },transaction
            })

            if(destroyDish===1)
            {
                // Xóa bảng dishImg
                let getDishImg:any = await db.DishImg.findAll({
                    attributes:['imgUrlImg'],
                    where:{
                        dishId
                    }
                })
                for(let i=0;i<getDishImg.length;i++)
                {
                    await db.Img.destroy({
                        where:{
                                url_img:getDishImg[i].imgUrlImg
                        }
                    })

                    fs.unlinkSync("uploads/"+getDishImg[i].imgUrlImg);
                }

                await db.DishImg.destroy({
                    where:{
                        dishId
                    }
                })

            }
            transaction.commit();
            return res.status(200).send({
                status:1,
                description:"Ok",
            })
        } catch (error) {
            if(transaction)
            {
                transaction.rollback();
            }
            ErrorGeneral(error,200,req,res,next);
        }
    }
}