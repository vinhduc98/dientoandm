import db from '../database/cookingrecipe';
import {RegexHandle} from '../functionManage/checkregex';
import bcrypt from 'bcryptjs'
import {ErrorGeneral} from '../description/description';
import {img} from '../config/defaultimg.config';
import fs from 'fs';

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
                sex:body.sex,
                type:body.type,
                dateOfBirth:body.dateOfBirth,
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

    async getAccountInfo(req:any, res:any, next:any){
        let jwtPayLoad = req.jwtPayLoad;
        let id = jwtPayLoad.id;
        let user:any = {}
        try {
            const account = await db.Account.findOne({where:{
                id
            }});
            if(account)
            {
                user = {
                    id:account.id,
                    username:account.username,
                    name:account.name,
                    avatar:account.avatar,
                    type:account.type,
                    favorites:[]
                }
                const favo = await db.Favorite.findAll({where:{
                    accountId:account.id
                }})
                for(let i=0;i<favo.length;i++)
                {
                    if(user.favorites.indexOf(favo[i].dishId)<=-1)
                    {
                        user.favorites.push(favo[i].dishId);
                    }
                }
            }
            else{
                user= {};
            }

            return res.status(200).send({
                status:1,
                description:"Ok",
                user
            })

        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }
    }

    async changeAvatar(req:any, res:any, next:any){
        let body =req.body;
        let jwtPayLoad = req.jwtPayLoad;
        let transaction = await db.sequelize.transaction();
        try {
            let oldAvatar = body.oldAvatar;
            let newAvatar = body.newAvatar;

            const avatar = await db.Account.findOne({
                where:{
                    id:jwtPayLoad.id,
                    avatar:oldAvatar
                }
            })
            if(avatar===null)
            {
                return res.status(200).send({
                    status:0,
                    description:'Lỗi web! avatar muốn thay đổi không phải là của account này'
                })
            }

            const getImg = await db.Img.findOne({
                where:{
                    url_img:newAvatar
                }
            })
            if(getImg===null)
            {
                return res.status(200).send({
                    status:0,
                    description:'Hình ảnh chưa được cập nhật lên server - yêu cầu kiểm tra lại'
                })
            }
            else{
                // update lại avatar mới
                await db.Account.update({
                    avatar:newAvatar
                },{
                    where:{
                        id:jwtPayLoad.id
                    },transaction
                })
                // iconlogin là icon mặc định không được xóa ở server cũng như db
                if(oldAvatar!==img.iconlogin)
                {
                    fs.unlinkSync("uploads/"+oldAvatar);

                    await db.Img.destroy({where:{
                        url_img:oldAvatar
                    },transaction})
                }
                transaction.commit();
                return res.status(200).send({
                    status:1,
                    description:"Ok"
                })
            }
        } catch (error) {
            if(transaction)
            {
                transaction.rollback();
            }
            ErrorGeneral(error,200,req,res,next);
        }
    }

    async updateAccount(req:any, res:any, next:any){
        let transaction = await db.sequelize.transaction();
        let body = req.body;
        let jwtPayLoad = req.jwtPayLoad;
        try {
            let updateAccount = await db.Account.update({
                name:body.name,
            }, {where:{
                id:jwtPayLoad.id
            }})
            if(body.favorites!==undefined)
            {
                let favorites:any = body.favorites;
                // xóa tất cả các favorite của id này
                await db.Favorite.destroy({
                    where:{
                        accountId:jwtPayLoad.id
                    },transaction
                })

                if(favorites.length>0)
                {
                    for(let i=0;i<favorites.length;i++)
                    {
                        await db.Favorite.create({
                            accountId:jwtPayLoad.id,
                            dishId:favorites[i]
                        },{transaction})
                    }
                }
            }
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

    async changePassword(req:any, res:any, next:any){
        let jwtPayLoad= req.jwtPayLoad;
        let body = req.body;
        let account = await db.Account.findOne({where:{id:jwtPayLoad.id}});
        const regex = new RegexHandle();
        try {
            let isPwdvalid = bcrypt.compareSync(body.oldPwd, account.pwd);
            if(!isPwdvalid||await regex.kiemTraChuoiCoDau(body.oldPwd)===true)
            {
                return res.status(200).send({
                    status:0,
                    description:"Mật khẩu cũ không tồn tại"
                })
            }

            if(body.oldPwd===body.newPwd)
            {
                return res.status(200).send({
                    status:0,
                    description:"Mật khẩu trùng với mật khẩu mới"
                })
            }

            if(await regex.kiemTraChuoiCoDau(body.newPwd)===true)
            {
                return res.status(200).send({
                    status:0,
                    description:"Mật khẩu không được có dấu"
                })
            }

            await db.Account.update({
                pwd:bcrypt.hashSync(body.newPwd,10)
            },{
                where:{
                    id:jwtPayLoad.id
                }
            })

            return res.status(200).send({
                status:1,
                description:"Ok"
            })

        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }

    }

    async getAllAccount(req:any, res:any, next:any){
        try {
            const accounts = await db.Account.findAll({
                attributes:['id','username','name','dateOfBirth','sex','avatar','type','state']
            });

            return res.status(200).send({
                status:1,
                description:"Ok",
                accounts
            })
        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }
    }

}