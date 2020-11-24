import db from '../database/cookingrecipe';
import {ErrorGeneral} from '../description/description';
export class FavoriteController{
    async getFavoriteByDishId(req:any, res:any, next:any){
        try {
            let listUserId:any =[];
            const dishId = req.params.dishId;
            let favorite =await db.Favorite.findAll({
                attributes:['accountId'],
                where:{
                    dishId
                }
            })

            for(let i=0;i<favorite.length;i++)
            {
                const getName = await db.Account.findOne({
                    where:{
                        id:favorite[i].accountId
                    }
                })
                listUserId.push({id:favorite[i].accountId,name:getName.name});
            }
            return res.status(200).send({
                status:1,
                description:"Ok",
                users:listUserId,
                count:favorite.length

            })
        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }
    }
}