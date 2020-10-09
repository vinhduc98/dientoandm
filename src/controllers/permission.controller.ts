import db from '../database/cookingrecipe';
import Sequelize from 'sequelize'
import {ErrorGeneral} from '../description/description';

export class PermissionController{
    async createPermission(req:any, res:any, next:any){
        let jwtPayLoad = req.jwtPayLoad;
        let transaction = await db.sequelize.transaction();
        let body= req.body;
        try {
            let createPermission = await db.Permission.create({
                name:body.name,
                status:1
            },{transaction})
            transaction.commit();
            return res.status(200).send({
                status:1,
                description:"Ok"
            })
        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }
    }
}