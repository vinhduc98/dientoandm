import db from '../database/cookingrecipe';
import {ErrorGeneral} from '../description/description';
export class MessageController {
    async addMessage (req:any, res:any, next:any){
        const body = req.body;
        try {
            const message = await db.Message.create({
                accountId:body.sender,
                message:body.message,
                read:body.read===undefined?0:body.read
            })

            if(message.getDataValue("id")!==undefined)
            {
                await db.Recipient.create({
                    accountId:body.recipient,
                    messageId:message.getDataValue("id")
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
            const messageSend = await db.Message.findAll({
                where:{
                    accountId:sender
                }
            });
            for (let i=0;i< messageSend.length;i++)
            {
                let messSend = {
                    sender:messageSend[i].getDataValue("accountId"),
                    message:messageSend[i].message,
                    status:messageSend[i].read,
                    createdAt:messageSend[i].getDataValue("createdAt")
                }

                listMessage.push(messSend);
            }

            const messageReceive = await db.Recipient.findAll({
                where:{
                    accountId:recipient
                }
            })
            for(let j=0;j<messageReceive.length;j++)
            {
                let receive = await db.Message.findOne({
                    where:{
                        id: messageReceive[j].getDataValue("messageId")
                    }
                })

                let messReceive = {
                    recipient:receive.getDataValue("accountId"),
                    message:receive.message,
                    status:receive.read,
                    createdAt:receive.getDataValue("createdAt")
                }

                listMessage.push(messReceive)
            }

            // sắp xếp theo time
            listMessage.sort((a:any,b:any)=>{
                return a.createdAt.getTime() - b.createdAt.getTime();
            })

            return res.status(200).send({
                listMessage
            })
        } catch (error) {
            ErrorGeneral(error,200,req,res,next);
        }
    }
}