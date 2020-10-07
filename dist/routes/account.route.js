"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRouteNoauthenticate = exports.AccountRoute = void 0;
const account_controller_1 = require("../controllers/account.controller");
function AccountRoute(url, app) {
    const acc = new account_controller_1.AccountController();
    app.route(`${url}/getAccountInfo`).get(acc.getAccountInfo);
    app.route(`${url}/changeAvatar`).put(acc.changeAvatar);
    app.route(`${url}/updateAccount`).put(acc.updateAccount);
    app.route(`${url}/changePassword`).put(acc.changePassword);
}
exports.AccountRoute = AccountRoute;
function AccountRouteNoauthenticate(url, app) {
    const acc = new account_controller_1.AccountController();
    app.route(`${url}/CreateAccount`).post(acc.createAccount);
}
exports.AccountRouteNoauthenticate = AccountRouteNoauthenticate;
//# sourceMappingURL=account.route.js.map