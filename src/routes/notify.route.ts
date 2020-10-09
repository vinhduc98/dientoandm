import { Express } from 'express';
import {NotifyController} from '../controllers/notify.controller'

export function NotifyRoute(url:string, app:Express){
    const notify = new NotifyController();
    app.route(`${url}/getNotifyByAccountId`).get(notify.getNotifybyaccountId);
}