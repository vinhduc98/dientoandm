import { Express } from 'express';
import {FavoriteController} from '../controllers/favorite.controller';

export function FavoriteRouteNoauthenticate(url:string, app:Express){
    const favorite = new FavoriteController();
    app.route(`${url}/getFavoriteByDishId/:dishId`).get(favorite.getFavoriteByDishId);

}

export function FavoriteRoute(url:string, app:Express){
    const favorite = new FavoriteController();
    app.route(`${url}/changeFavorite`).put(favorite.changeFavorite);
}