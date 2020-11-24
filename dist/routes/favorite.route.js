"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteRouteNoauthenticate = void 0;
const favorite_controller_1 = require("../controllers/favorite.controller");
function FavoriteRouteNoauthenticate(url, app) {
    const dish = new favorite_controller_1.FavoriteController();
    app.route(`${url}/getFavoriteByDishId/:dishId`).get(dish.getFavoriteByDishId);
}
exports.FavoriteRouteNoauthenticate = FavoriteRouteNoauthenticate;
//# sourceMappingURL=favorite.route.js.map