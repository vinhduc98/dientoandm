import db from '../database/cookingrecipe';
import {RegexHandle} from '../functionManage/checkregex';
import bcrypt from 'bcryptjs'
import {ErrorGeneral} from '../description/description';
import {img} from '../config/defaultimg.config';
export class AccountController{
    async createAccount(req:any, res:any, next:any){
        let transaction = await db.sequelize.transaction();
        const regex = new RegexHandle();
        const body =req.body;
        try {
            if(await regex.kiemTraChuoiCoDau(body.username)===true||await regex.kiemTraChuoiCoDau(body.pwd)===true)
            {
                return res.status(200).send({
                    status:0,
                    description:"không thể tạo username và password có dấu"
                })
            }
            let createAccount = await db.Account.create({
                username: body.username,
                pwd: bcrypt.hashSync(body.pwd,10),
                name:body.name,
                type:body.type,
                avatar:img.iconlogin
            },{transaction})
            transaction.commit();
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