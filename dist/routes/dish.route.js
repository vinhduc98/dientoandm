"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishRouteNoauthenticate = exports.DishRoute = void 0;
const dish_controller_1 = require("../controllers/dish.controller");
const check_dish_myself_create_middlesware_1 = require("../middleswares/check_dish_myself_create.middlesware");
const check_img_file_middlesware_1 = require("../middleswares/check_img_file.middlesware");
function DishRoute(url, app) {
    const dish = new dish_controller_1.DishController();
    app.route(`${url}/createDish`).post(dish.createDish);
    app.route(`${url}/updateDish/:dishId`).put(check_dish_myself_create_middlesware_1.checkDishMyselfCreate, check_img_file_middlesware_1.checkImgFile, dish.updateDish);
    app.route(`${url}/deleteDish/:dishId`).delete(check_dish_myself_create_middlesware_1.checkDishMyselfCreate, dish.deleteDish);
}
exports.DishRoute = DishRoute;
function DishRouteNoauthenticate(url, app) {
    const dish = new dish_controller_1.DishController();
    app.route(`${url}/getAlldish`).get(dish.getAllDish);
}
exports.DishRouteNoauthenticate = DishRouteNoauthenticate;
//# sourceMappingURL=dish.route.js.map