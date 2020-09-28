import { Express } from 'express';
import {AuthController} from '../controllers/auth.controller'

export function AuthRoute(url:string, app:Express){
    const auth = new AuthController();
    app.route(`${url}/Login`).post(auth.Login);
}