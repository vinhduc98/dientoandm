import db from '../database/cookingrecipe';
import {ErrorGeneral} from '../description/description';
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
                    sender:messageSend[i].getDataValue("accountId"),
                    message:messageSend[i].message,
                    status:messageSend[i].read,
                    createdAt:messageSend[i].getDataValue("createdAt")
                }

                listMessage.push(messSend);

            }
            // Trường hợp nhắn tin cho chính bản thân
            if(sender === recipient)
            {
                return res.status(200).send({
                    messages:listMessage,
                    status:1,
                    description:"Ok"
                })
            }
            // Lấy tin nhắn nhận
            const messageReceive = await db.Recipient.findAll({
                where:{
                    accountId:recipient
                }
            })
            // Trường hợp nhắn tin
            if(messageReceive.length===0)
            {
                return res.status(200).send({
                    messages:[],
                    status:0,
                    description:"Tin nhắn không được gửi"
                })
            }
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
}