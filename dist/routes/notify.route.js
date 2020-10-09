"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyRoute = void 0;
const notify_controller_1 = require("../controllers/notify.controller");
function NotifyRoute(url, app) {
    const notify = new notify_controller_1.NotifyController();
    app.route(`${url}/getNotifyByAccountId`).get(notify.getNotifybyaccountId);
}
exports.NotifyRoute = NotifyRoute;
//# sourceMappingURL=notify.route.js.map