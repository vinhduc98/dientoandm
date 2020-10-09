import { Express } from 'express';
import {PermissionController} from '../controllers/permission.controller'

export function PermissionRoute(url:string, app:Express){
    const permission = new PermissionController();
    app.route(`${url}/createPermission`).post(permission.createPermission);
}