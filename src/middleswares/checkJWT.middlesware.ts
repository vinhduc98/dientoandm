import jwt from "jsonwebtoken";
import db from "../database/cookingrecipe";
import {configToken} from "../config/server.config"

export const checkJWT = async (req:any, res:any, next:any)=>{
    if (req.headers.authorization === null || req.headers.authorization === "" || req.headers.authorization === undefined) {
        return res.status(401).send(
        {
            status: 0,
            description: "Key token chưa xác thực"
        });
    }

    const token = req.headers.authorization.split(" ")[1] as string;
    if(!token){
        return res.status(401).send(
        {
            status: 0,
            description: "Mã token xác thực không đúng"
        });
    }

    // Kiểm tra token có nằm trong csdl mới cho sử dụng
    req.token = token;
    const tk = await db.Token.findOne({
        where:{
            token: req.token
        }
    })

    if(!tk)
    {
        return res.status(401).send(
        {
            status: 0,
            description: "token hiện tại không sử dụng được"
        });
    }
    if(req.headers.authorization.split(" ")[0] ==='Bearer')
    {
        let jwtPayLoad: any;
        try {
            jwtPayLoad = jwt.verify(token, configToken.SecretKey);
            req.jwtPayLoad = jwtPayLoad;
        } catch (error) {
            await db.Token.destroy({where:{
                token
            }})
            return res.status(401).send(
            {
                status: 0,
                description: "Token hiện tại hết hạn"
            });
        }
    }

    next();
}

export const checkJWTDb = async (req:any, res:any, next:any)=>{
    let jwtPayLoad = req.jwtPayLoad;
    let username =jwtPayLoad.username;
    const getToken = await db.Token.findAll({
        where:{
            username
        }
    });
    for(let i =0;i<getToken.length;i++)
    {
        if(Date.now()>=getToken[i].expiredIn.getTime())
        {
            await db.Token.destroy({where:{
                token:getToken[i].token
            }})
        }
    }

    next();
}