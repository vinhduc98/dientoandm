"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesNoauthenticate = exports.routes = void 0;
const fileImage_routes_1 = require("./routes/fileImage.routes");
const account_route_1 = require("./routes/account.route");
const dish_route_1 = require("./routes/dish.route");
const auth_route_1 = require("./routes/auth.route");
const comment_route_1 = require("./routes/comment.route");
const permission_route_1 = require("./routes/permission.route");
const notify_route_1 = require("./routes/notify.route");
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
    permission_route_1.PermissionRoute("/api/Permission", app);
    notify_route_1.NotifyRoute("/api/Notify", app);
}
exports.routes = routes;
function routesNoauthenticate(app) {
    app.route("/").get((req, res) => {
        res.render("index");
    });
    auth_route_1.AuthRouteNoauthenticate("/api/Auth", app);
    dish_route_1.DishRouteNoauthenticate("/api/Dish", app);
    account_route_1.AccountRouteNoauthenticate("/api/Account", app);
    comment_route_1.CommentRouteNoauthenticate("/api/Comment", app);
}
exports.routesNoauthenticate = routesNoauthenticate;
//# sourceMappingURL=routes.js.map