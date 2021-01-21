import db from '../database/cookingrecipe';
import {ErrorGeneral} from '../description/description';
import { NotifyController } from './notify.controller';
export class MessageController {

    async addMessage (req:any, res:any, next:any){
        const body = req.body;
        const sender = body.sender;
        const recipient = body.recipient;
        const message = body.message;
        const read = body.read;
        try {
            const mess = await db.Message.create({
                accountId:sender,
                message,
                read:read===undefined?0:body.read
            })

            if(mess.getDataValue("id")!==undefined)
            {
                await db.Recipient.create({
                    accountId:recipient,
                    messageId:mess.getDataValue("id")
                })
            }

            return res.status(200).send({
                status:1,
                description:'Ok'
            })
        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }
    }

    async getMessageByAccountId (req:any, res:any, next:any){
        const sender = req.query.senderId;
        const recipient = req.query.recipientId;
        let listMessage:any = [];
        try {
            // Lấy tin nhắn gửi
            const messageSend = await db.Message.findAll({
                where:{
                    accountId:sender
                }
            });
            for (let i=0;i< messageSend.length;i++)
            {
                let messSend = {
                    messageId:messageSend[i].id,
                    sender:messageSend[i].getDataValue("accountId"),
                    message:messageSend[i].message,
                    status:messageSend[i].read,
                    createdAt:messageSend[i].getDataValue("createdAt")
                }

                const idRecieve = await db.Recipient.findOne({
                    where:{
                        messageId:messageSend[i].id
                    }
                })

                if(recipient.toString()===idRecieve.accountId.toString())
                {
                    listMessage.push(messSend);
                }
            }

            if(sender.toString()===recipient.toString())
            {
                return res.status(200).send({
                    messages:listMessage,
                    status:1,
                    description:"Ok"
                })
            }
            const messageRecieve = await db.Message.findAll({
                where:{
                    accountId:recipient
                }
            })

            for(let j = 0 ;j< messageRecieve.length; j++)
            {
                let messRecieve = {
                    messageId:messageRecieve[j].id,
                    recipient:messageRecieve[j].getDataValue("accountId"),
                    status:messageRecieve[j].read,
                    message:messageRecieve[j].message,
                    createdAt:messageRecieve[j].getDataValue("createdAt")
                }

                const idRecieve = await db.Recipient.findOne({
                    where:{
                        messageId:messageRecieve[j].id
                    }
                })

                if(idRecieve.accountId.toString()===sender.toString())
                {
                    listMessage.push(messRecieve);
                }

            }
            // sắp xếp theo thời gian
            listMessage.sort((a:any,b:any)=>{
                return a.createdAt.getTime() - b.createdAt.getTime();
            })

            return res.status(200).send({
                messages:listMessage,
                status:1,
                description:"Ok"
            })
        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }
    }

    async getMessageLast(req:any, res:any, next:any){
        const account = req.query.account;
        const friend = req.query.account;
        try {
            let accounts = await db.Account.findAll();
            for(let i=0;i<accounts.length;i++)
            {
                const messages = await db.Message.findOne({
                    where:{
                        accountId:accounts[i].id
                    }
                })

                // if(messages!==null)
                // {

                // }
            }

            return res.send('Ok')
        } catch (error) {
            ErrorGeneral(error, 200, req, res, next);
        }
    }
}