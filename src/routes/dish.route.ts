import { Express } from 'express';
import {DishController} from '../controllers/dish.controller';
import {checkJWT,checkJWTDb} from '../middleswares/checkJWT.middlesware';

export function DishRoute(url:string, app:Express){
    const dish = new DishController();
    app.route(`${url}/createDish`).post(dish.createDish);
}
export function DishRouteNoauthenticate(url:string, app:Express){
    const dish = new DishController();
    app.route(`${url}/getAlldish`).get(dish.getAllDish);
}