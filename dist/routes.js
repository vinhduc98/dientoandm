"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const fileImage_routes_1 = require("./routes/fileImage.routes");
const account_route_1 = require("./routes/account.route");
const dish_route_1 = require("./routes/dish.route");
const auth_route_1 = require("./routes/auth.route");
function routes(app) {
    app.route("/").get((req, res) => {
        res.render("index");
    });
    auth_route_1.AuthRoute("/api/Auth", app);
    fileImage_routes_1.FileImageRoute("/api/Image", app);
    account_route_1.AccountRoute("/api/Account", app);
    dish_route_1.DishRoute("/api/Dish", app);
}
exports.routes = routes;
//# sourceMappingURL=routes.js.map