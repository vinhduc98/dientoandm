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

    async changeFavorite(req:any,res:any, next:any){
        let transaction = await db.sequelize.transaction();
        let body = req.body;
        let jwtPayLoad = req.jwtPayLoad;
        try {

            console.log(body.status);

            if(body.status===1)
            {
                await db.Favorite.create({
                    accountId:jwtPayLoad.id,
                    dishId:body.dishId,
                },{transaction})
                transaction.commit();
            }
            else{
                await db.Favorite.destroy({where:{
                    dishId:body.dishId,
                    accountId:jwtPayLoad.id
                },transaction})
                transaction.commit();
            }

            return res.status(200).send({
                status:1,
                description:"Ok"
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