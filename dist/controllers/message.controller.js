"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const cookingrecipe_1 = __importDefault(require("../database/cookingrecipe"));
const description_1 = require("../description/description");
class MessageController {
    addMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const sender = body.sender;
            const recipient = body.recipient;
            const message = body.message;
            const read = body.read;
            try {
                const mess = yield cookingrecipe_1.default.Message.create({
                    accountId: sender,
                    message,
                    read: read === undefined ? 0 : body.read
                });
                if (mess.getDataValue("id") !== undefined) {
                    yield cookingrecipe_1.default.Recipient.create({
                        accountId: recipient,
                        messageId: mess.getDataValue("id")
                    });
                }
                return res.status(200).send({
                    status: 1,
                    description: 'Ok'
                });
            }
            catch (error) {
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
    getMessageByAccountId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const sender = req.query.senderId;
            const recipient = req.query.recipientId;
            let listMessage = [];
            try {
                // Lấy tin nhắn gửi
                const messageSend = yield cookingrecipe_1.default.Message.findAll({
                    where: {
                        accountId: sender
                    }
                });
                for (let i = 0; i < messageSend.length; i++) {
                    let messSend = {
                        sender: messageSend[i].getDataValue("accountId"),
                        message: messageSend[i].message,
                        status: messageSend[i].read,
                        createdAt: messageSend[i].getDataValue("createdAt")
                    };
                    listMessage.push(messSend);
                }
                // Trường hợp nhắn tin cho chính bản thân
                if (sender === recipient) {
                    return res.status(200).send({
                        messages: listMessage,
                        status: 1,
                        description: "Ok"
                    });
                }
                // Lấy tin nhắn nhận
                const messageReceive = yield cookingrecipe_1.default.Recipient.findAll({
                    where: {
                        accountId: recipient
                    }
                });
                // Trường hợp nhắn tin
                if (messageReceive.length === 0) {
                    return res.status(200).send({
                        messages: [],
                        status: 0,
                        description: "Tin nhắn không được gửi"
                    });
                }
                for (let j = 0; j < messageReceive.length; j++) {
                    let receive = yield cookingrecipe_1.default.Message.findOne({
                        where: {
                            id: messageReceive[j].getDataValue("messageId")
                        }
                    });
                    let messReceive = {
                        recipient: receive.getDataValue("accountId"),
                        message: receive.message,
                        status: receive.read,
                        createdAt: receive.getDataValue("createdAt")
                    };
                    listMessage.push(messReceive);
                }
                // sắp xếp theo thời gian
                listMessage.sort((a, b) => {
                    return a.createdAt.getTime() - b.createdAt.getTime();
                });
                return res.status(200).send({
                    messages: listMessage,
                    status: 1,
                    description: "Ok"
                });
            }
            catch (error) {
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
}
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map