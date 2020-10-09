import db from '../database/cookingrecipe';
import {ErrorGeneral} from '../description/description';
export class NotifyController{
    async getNotifybyaccountId(req:any, res:any, next:any){
        let jwtPayLoad = req.jwtPayLoad;
        let notifies:any =[];
        try {
            let getNotifies = await db.Notify.findAll({
                where:{
                    accountId:jwtPayLoad.id
                },
                order:[['updatedAt','DESC']]
            })
            for(let i=0;i<getNotifies.length;i++)
            {
                notifies.push(getNotifies[i]);
            }

            return res.status(200).send({
                status:1,
                description:"Ok",
                notifies
            })
        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }
    }
}