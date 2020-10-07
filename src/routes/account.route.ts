import { Express } from 'express';
import {AccountController} from '../controllers/account.controller'
import {checkJWT,checkJWTDb} from '../middleswares/checkJWT.middlesware';

export function AccountRoute(url:string, app:Express){
    const acc = new AccountController();
    app.route(`${url}/getAccountInfo`).get(acc.getAccountInfo);
    app.route(`${url}/changeAvatar`).put(acc.changeAvatar);
    app.route(`${url}/updateAccount`).put(acc.updateAccount);
    app.route(`${url}/changePassword`).put(acc.changePassword);
}
export function AccountRouteNoauthenticate(url:string, app:Express){
    const acc = new AccountController();
    app.route(`${url}/CreateAccount`).post(acc.createAccount);
}