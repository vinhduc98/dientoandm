import { Express } from 'express';
import {FavoriteController} from '../controllers/favorite.controller';

export function FavoriteRouteNoauthenticate(url:string, app:Express){
    const dish = new FavoriteController();
    app.route(`${url}/getFavoriteByDishId/:dishId`).get(dish.getFavoriteByDishId);
}