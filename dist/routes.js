"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesNoauthenticate = exports.routes = void 0;
const fileImage_routes_1 = require("./routes/fileImage.routes");
const account_route_1 = require("./routes/account.route");
const dish_route_1 = require("./routes/dish.route");
const auth_route_1 = require("./routes/auth.route");
const checkJWT_middlesware_1 = require("./middleswares/checkJWT.middlesware");
function routes(app) {
    app.route("/").get((req, res) => {
        res.render("index");
    });
    app.use(checkJWT_middlesware_1.checkJWT, checkJWT_middlesware_1.checkJWTDb);
    auth_route_1.AuthRoute("/api/Auth", app);
    dish_route_1.DishRoute("/api/Dish", app);
    account_route_1.AccountRoute("/api/Account", app);
    fileImage_routes_1.FileImageRoute("/api/Image", app);
}
exports.routes = routes;
function routesNoauthenticate(app) {
    app.route("/").get((req, res) => {
        res.render("index");
    });
    auth_route_1.AuthRouteNoauthenticate("/api/Auth", app);
    dish_route_1.DishRouteNoauthenticate("/api/Dish", app);
    account_route_1.AccountRouteNoauthenticate("/api/Account", app);
}
exports.routesNoauthenticate = routesNoauthenticate;
//# sourceMappingURL=routes.js.map