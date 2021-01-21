import { Express } from 'express';
import {MessageController} from '../controllers/message.controller'

export function MessageRouteNoauthenticate(url:string, app:Express){
    const message = new MessageController();
    app.route(`${url}/addMessage`).post(message.addMessage);
    app.route(`${url}/getMessageByAccountId`).get(message.getMessageByAccountId);
    app.route(`${url}/getMessageLast`).get(message.getMessageLast);
}