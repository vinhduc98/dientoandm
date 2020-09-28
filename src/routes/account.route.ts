import { Express } from 'express';
import {AccountController} from '../controllers/account.controller'

export function AccountRoute(url:string, app:Express){
    const acc = new AccountController();
    app.route(`${url}/CreateAccount`).post(acc.createAccount);
}