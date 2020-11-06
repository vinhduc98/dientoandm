import db from "../database/cookingrecipe";

export const checkCommentChildrenCreate = async (req:any, res:any, next:any)=>{
    let isChildren = req.body.isChildren;
    let dishId = req.body.dishId;

    let getAllCommentByDishId = await db.Comment.findAll({
        where:{
            dishId
        }
    })
    if(isChildren!==0)
    {
        for(let i=0;i<getAllCommentByDishId.length;i++)
        {
            if(isChildren!==getAllCommentByDishId[i].id)
            {
                return res.status(200).send({
                    status:0,
                    description:"Lỗi web!!! Bình luận này không trả lời cho bình luận nào cả (kiểm tra lại isChildren)"
                })
            }
        }
    }

    next();

}