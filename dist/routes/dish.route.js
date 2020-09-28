"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishRouteNoauthenticate = exports.DishRoute = void 0;
const dish_controller_1 = require("../controllers/dish.controller");
function DishRoute(url, app) {
    const dish = new dish_controller_1.DishController();
    app.route(`${url}/createDish`).post(dish.createDish);
}
exports.DishRoute = DishRoute;
function DishRouteNoauthenticate(url, app) {
    const dish = new dish_controller_1.DishController();
    app.route(`${url}/getAlldish`).get(dish.getAllDish);
}
exports.DishRouteNoauthenticate = DishRouteNoauthenticate;
//# sourceMappingURL=dish.route.js.map