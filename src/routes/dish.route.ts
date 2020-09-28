import { Express } from 'express';
import {DishController} from '../controllers/dish.controller'

export function DishRoute(url:string, app:Express){
    const dish = new DishController();

    app.route(`${url}/getAlldish`).get(dish.getAllDish);
    app.route(`${url}/createDish`).post(dish.createDish);
}