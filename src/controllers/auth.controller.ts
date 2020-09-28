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
                avatar:account.avatar
            }, configToken.SecretKey,{expiresIn:configToken.ExpiresIn});

            // Lưu token vào trong CSDL
            const d = new Date(Date.now());
            d.setSeconds(d.getSeconds()+configToken.ExpiresIn);

            const token ={
                token: accesstoken,
                username: account.username,
                expiresIn:d
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
            ErrorGeneral(error,200, req, res, next);
        }
    }
}