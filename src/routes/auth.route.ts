import { Express } from 'express';
import {AuthController} from '../controllers/auth.controller';
import {checkJWT,checkJWTDb} from '../middleswares/checkJWT.middlesware';

export function AuthRoute(url:string, app:Express){
    const auth = new AuthController();
    app.route(`${url}/Logout`).post(auth.Logout);
}

export function AuthRouteNoauthenticate(url:string, app:Express){
    const auth = new AuthController();
    app.route(`${url}/Login`).post(auth.Login);
}