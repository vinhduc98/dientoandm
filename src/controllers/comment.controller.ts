import db from '../database/cookingrecipe'
import {ErrorGeneral} from '../description/description';
import {FunctionHandle} from '../functionManage/destroyfilecloudinary';

export class CommentController{
    async createComment(req:any, res:any, next:any){
        let transaction = await db.sequelize.transaction();
        let body=req.body;
        try {
            let createCmt = await db.Comment.create({
                rating:body.rating,
                comment:body.comment,
                author:body.author,
                dishId:body.dishId
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
                if(findAccount!==null)
                {
                    await db.Comment.update({
                        state:"Thành viên"
                    },{where:{
                        id
                    },transaction})
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
}