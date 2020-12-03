"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteRoute = exports.FavoriteRouteNoauthenticate = void 0;
const favorite_controller_1 = require("../controllers/favorite.controller");
function FavoriteRouteNoauthenticate(url, app) {
    const favorite = new favorite_controller_1.FavoriteController();
    app.route(`${url}/getFavoriteByDishId/:dishId`).get(favorite.getFavoriteByDishId);
}
exports.FavoriteRouteNoauthenticate = FavoriteRouteNoauthenticate;
function FavoriteRoute(url, app) {
    const favorite = new favorite_controller_1.FavoriteController();
    app.route(`${url}/changeFavorite`).put(favorite.changeFavorite);
}
exports.FavoriteRoute = FavoriteRoute;
//# sourceMappingURL=favorite.route.js.map