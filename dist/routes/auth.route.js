"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
function AuthRoute(url, app) {
    const auth = new auth_controller_1.AuthController();
    app.route(`${url}/Login`).post(auth.Login);
}
exports.AuthRoute = AuthRoute;
//# sourceMappingURL=auth.route.js.map