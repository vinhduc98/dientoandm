"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRoute = void 0;
const account_controller_1 = require("../controllers/account.controller");
function AccountRoute(url, app) {
    const acc = new account_controller_1.AccountController();
    app.route(`${url}/CreateAccount`).post(acc.createAccount);
}
exports.AccountRoute = AccountRoute;
//# sourceMappingURL=account.route.js.map