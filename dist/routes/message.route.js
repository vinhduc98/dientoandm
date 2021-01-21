"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRouteNoauthenticate = void 0;
const message_controller_1 = require("../controllers/message.controller");
function MessageRouteNoauthenticate(url, app) {
    const message = new message_controller_1.MessageController();
    app.route(`${url}/addMessage`).post(message.addMessage);
    app.route(`${url}/getMessageByAccountId`).get(message.getMessageByAccountId);
    app.route(`${url}/getMessageLast`).get(message.getMessageLast);
}
exports.MessageRouteNoauthenticate = MessageRouteNoauthenticate;
//# sourceMappingURL=message.route.js.map