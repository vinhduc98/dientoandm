import db from '../database/cookingrecipe'
import {ErrorGeneral} from '../description/description';
import {FunctionHandle} from '../functionManage/destroyfilecloudinary';
import {img} from '../config/defaultimg.config';
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
                    comments:[],
                    commentState:getAlldish[i].commentState,
                    createdDate:getAlldish[i].createdAt
                };

                let listimg = await db.DishImg.findAll({where:{
                    dishId:getAlldish[i].id
                }});
                let listcmt = await db.Comment.findAll({
                    where:{

                        dishId:getAlldish[i].id
                    },
                    order:[['createdAt','DESC']]
                })

                for(let m=0;m<listimg.length;m++)
                {
                    dish.imgs.push(listimg[m].getDataValue('imgUrlImg'));
                }
                for(let n=0;n<listcmt.length;n++)
                {
                    dish.comments.push({author:listcmt[n].author, rating:listcmt[n].rating, comment:listcmt[n].comment, isMember:listcmt[n].isMember});
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
        let functionHandle = new FunctionHandle();
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

            if(body.imgs!==undefined)
            {
                await db.DishImg.destroy({where:{
                    dishId
                },transaction})
                let imgs = body.imgs;
                if(imgs.length>0)
                {
                    for(let i=0;i<imgs.length;i++)
                    {
                        let getImg = await db.Img.findOne({where:{
                            url_img:imgs[i]
                        }})
                        if(getImg!==null)
                        {
                            // Tạo lại Dishimg
                            await db.DishImg.create({
                                dishId,
                                imgUrlImg:getImg.url_img
                            },{transaction})

                        }
                        else{
                            return res.status(200).send({
                                status:0,
                                description:'Hình ảnh chưa được cập nhật lên server - yêu cầu kiểm tra lại'
                            })
                        }
                    }
                }
                // Xóa ảnh từ server quản lý ảnh
                let ArrDishImg:any=[];
                let avatar = await db.Account.findOne({
                    attributes:['avatar'],
                    where:{id:jwtPayLoad.id}
                });

                let getImgbyuser = await db.Img.findAll({
                    attributes:['url_img'],
                    where:{
                        createUser:jwtPayLoad.username
                    }
                })

                let getDishimg = await db.DishImg.findAll({
                    attributes:['imgUrlImg'],
                    where:{
                        dishId
                    }
                })
                getDishimg.forEach((element:any) => {
                    ArrDishImg.push(element.imgUrlImg);
                });
                for(let i=0;i<getImgbyuser.length;i++)
                {
                    if(ArrDishImg.indexOf(getImgbyuser[i].url_img)<=-1&&getImgbyuser[i].url_img!==avatar.avatar)
                    {
                        functionHandle.DestroyedFileImgOnCloudinary(getImgbyuser[i].url_img);
                        await db.Img.destroy({
                            where:{url_img:getImgbyuser[i].url_img},transaction
                        })
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
        let functionHandle = new FunctionHandle();
        let jwtPayLoad = req.jwtPayLoad;
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
                await db.DishImg.destroy({
                    where:{
                        dishId
                    },transaction
                })
                // Lấy tất cả hình do user tạo
                let getImgbyuser = await db.Img.findAll({
                    where:{
                        createUser:jwtPayLoad.username
                    }
                })
                // Lấy avatar
                let avatar = await db.Account.findOne({
                    attributes:['avatar'],
                    where:{id:jwtPayLoad.id}
                });
                for(let i=0;i<getImgbyuser.length;i++)
                {
                    if(getImgbyuser[i].url_img!==avatar.avatar)
                    {
                        // Xóa tất cả hình tron Img
                        functionHandle.DestroyedFileImgOnCloudinary(getImgbyuser[i].url_img);
                        await db.Img.destroy({
                            where:{
                                url_img:getImgbyuser[i].url_img
                            },transaction
                        })
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
}