import db from '../database/cookingrecipe';
import {RegexHandle} from '../functionManage/checkregex';
import bcrypt from 'bcryptjs'
import {ErrorGeneral} from '../description/description';
import jwt from 'jsonwebtoken';
import { configToken } from '../config/server.config';


export class AuthController{
    async Login(req:any, res:any, next: any){
        const regex = new RegexHandle();
        const body = req.body;
        try {
            let account = await db.Account.findOne({
                attributes:['id','name','type','username','avatar','pwd'],
                where:{
                    username:body.username
                }
            })
            if(!account||await regex.kiemTraChuoiCoDau(body.username)===true)
            {
                return res.status(200).send({
                    status:0,
                    description:"Sai tài khoản"
                })
            }
            const passwordIsValid = bcrypt.compareSync(body.pwd,account.pwd);
            if(!passwordIsValid||await regex.kiemTraChuoiCoDau(body.pwd)===true){
                return res.status(200).send({
                    status:0,
                    description: "Sai mật khẩu"
                })
            }

            const accesstoken = jwt.sign({
                id:account.id,
                name:account.name,
                type:account.type,
                username:account.username,
            }, configToken.SecretKey,{expiresIn:configToken.ExpiresIn});

            // Lưu token vào trong CSDL
            const d = new Date(Date.now());
            d.setSeconds(d.getSeconds()+configToken.ExpiresIn);
            const token ={
                token: accesstoken,
                username: account.username,
                expiredIn:d
            }

            await db.Token.create(token);

            return res.status(200).send({
                status:1,
                description:"Ok",
                data:{
                    id:account.id,
                    name:account.name,
                    type:account.type,
                    username:account.username,
                    avatar:account.avatar,
                    token:accesstoken
                }
            })

        } catch (error) {
            console.log(error);
            ErrorGeneral(error,200, req, res, next);
        }
    }

    async Logout(req:any, res:any, next:any)
    {
        const token = req.headers.authorization.split(" ")[1] as string;
        try {
            let deleteToken = await db.Token.destroy({
                where:{
                    token
                }
            });
            if(deleteToken===1)
            {
                return res.status(200).send({
                    status:1,
                    description:"Logout thành công"
                })
            }
            return res.status(200).send({
                status:0,
                description:"Token này hiện tại không có trong csdl"
            })
        } catch (error) {
            ErrorGeneral(error,200, req, res, next);
        }
    }
    // async changeAvatar(req:any, res:any, next:any){
    //     const body = req.body;
    //     let transaction = await db.sequelize.transaction();
    //     try {
    //         const oldImg = body.oldImg;
    //         const newImg = body.newImg;
    //     } catch (error) {
    //         if(transaction)
    //         {
    //             transaction.rollback();
    //         }
    //         ErrorGeneral(error,200,req,res,next);
    //     }
    // }
}