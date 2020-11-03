import { Express } from 'express';
import {DishController} from '../controllers/dish.controller';
import {checkDishMyselfCreate} from '../middleswares/check_dish_myself_create.middlesware';
import {checkImgFile} from '../middleswares/check_img_file.middlesware';

export function DishRoute(url:string, app:Express){
    const dish = new DishController();
    app.route(`${url}/createDish`).post(dish.createDish);
    app.route(`${url}/updateDish/:dishId`).put(checkDishMyselfCreate,checkImgFile,dish.updateDish);
    app.route(`${url}/deleteDish/:dishId`).delete(checkDishMyselfCreate,dish.deleteDish);
}
export function DishRouteNoauthenticate(url:string, app:Express){
    const dish = new DishController();
    app.route(`${url}/getAlldish`).get(dish.getAllDish);
}