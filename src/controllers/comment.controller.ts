import db from '../database/cookingrecipe'
import {ErrorGeneral} from '../description/description';
import {FunctionHandle} from '../functionManage/destroyfilecloudinary';
import Sequelize from "sequelize";

export class CommentController{
    async createComment(req:any, res:any, next:any){
        let transaction = await db.sequelize.transaction();
        let body=req.body;
        try {
            let createCmt = await db.Comment.create({
                rating:body.rating,
                comment:body.comment,
                author:body.author,
                isMember:body.isMember,
                dishId:body.dishId,
                isChildren:body.isChildren
            },{transaction})
            if(createCmt.getDataValue("id")!==undefined)
            {
                let id = createCmt.getDataValue("id");
                let author = createCmt.getDataValue("author");
                let findAccount = await db.Account.findOne({
                    where:{
                        username:author
                    }
                })
                if(createCmt.getDataValue('isMember')===1)
                {
                    if(findAccount===null)
                    {
                        return res.status(200).send({
                            status:0,
                            description:'Lỗi web! isMember hiện tại set trạng thái thành viên nhưng author không có trong danh sách user'
                        })
                    }
                }

                let findDish = await db.Dish.findOne({
                    where:{
                        id:body.dishId
                    }
                })
                // Thông báo cho account mỗi khi có người comment
                await db.Notify.create({
                    content:`${author} đã bình luận vào 1 dish của bạn`,
                    state:1,
                    accountId:findDish.getDataValue("accountId")
                })
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

    async getCommentByDishId(req:any, res:any, next:any){
        try {
            let dishId = req.params.dishId;
            let comments:any =[];
            let childComment:any=[];
            let cmt:any =[];
            let parentComments = await db.Comment.findAll({
                where:{
                    dishId,
                    isChildren:0
                },
                order:[['updatedAt','DESC']]
            })

            for(let i=0;i<parentComments.length;i++)
            {
                let objectParentComments:any = {
                    id:parentComments[i].id,
                    rating:parentComments[i].rating,
                    comment:parentComments[i].comment,
                    author:parentComments[i].author,
                    isMember:parentComments[i].isMember,
                    isChildren:parentComments[i].getDataValue("isChildren"),
                    createdAt:parentComments[i].getDataValue("createdAt"),
                    dishId:parentComments[i].getDataValue("dishId")
                }
                comments.push(objectParentComments);
            }
            console.log(comments);
            let childrenComments = await db.Comment.findAll({
                where:{
                    dishId,
                    isChildren:{
                       [Sequelize.Op.gt]:[0]
                    }
                },
                order:[['isChildren','ASC']]
            })
            for(let j =0;j<childrenComments.length;j++)
            {
                let objectChildrenComments:any = {
                    id:childrenComments[j].id,
                    rating:childrenComments[j].rating,
                    comment:childrenComments[j].comment,
                    author:childrenComments[j].author,
                    isMember:childrenComments[j].isMember,
                    isChildren:childrenComments[j].getDataValue("isChildren"),
                    createdAt:childrenComments[j].getDataValue("createdAt"),
                    dishId:childrenComments[j].getDataValue("dishId")
                }
                childComment.push(objectChildrenComments);
            }

            for(let k=0;k<comments.length;k++)
            {
                if(childComment.length>0)
                {
                    for(let h =0;h<childComment.length;h++)
                    {
                        if(cmt.indexOf(comments[k])<=-1)
                        {
                            cmt.push(comments[k]);
                        }
                        console.log(cmt);
                        if(comments[k].id===childComment[h].isChildren)
                        {
                            if(cmt.indexOf(childComment[h])<=-1)
                            {
                                cmt.push(childComment[h])
                            }
                        }
                    }
                }
                else{
                    cmt.push(comments[k]);
                }

            }

            return res.status(200).send({
                status:1,
                description:"Ok",
                comments:cmt
            })
        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }
    }

    async getCommentByCommentId(req:any, res: any, next:any ){
        try {
            let id = req.params.commentId;
            let comment =await db.Comment.findAll({
                attributes:['id','rating','comment','author','isMember', 'isChildren','createdAt'],
                where:{
                    isChildren:id
                }
            })
            return res.status(200).send({
                status:1,
                description:"Ok",
                commentChildren:comment
            })
        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }
    }
}