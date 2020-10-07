import db from "../database/cookingrecipe";

export const checkDishMyselfCreate = async (req:any, res:any, next:any)=>{
    let dishId = req.params.dishId;
    let jwtPayLoad = req.jwtPayLoad;

    let getDish = await db.Dish.findOne({
        where:{
            id:dishId
        }
    })

    if(getDish!==null)
    {
        if(getDish.getDataValue('accountId')===jwtPayLoad.id)
        {
            next();
        }
        else{
            return res.status(200).send({
                status:0,
                description:"Không được phép sửa hoặc xóa dish của người khác"
            })
        }
    }
    else{
        return res.status(200).send({
            status:0,
            description:`Dish ${dishId} không tồn tại`
        })
    }
}