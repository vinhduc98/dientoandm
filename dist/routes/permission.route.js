"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRoute = void 0;
const permission_controller_1 = require("../controllers/permission.controller");
function PermissionRoute(url, app) {
    const permission = new permission_controller_1.PermissionController();
    app.route(`${url}/createPermission`).post(permission.createPermission);
}
exports.PermissionRoute = PermissionRoute;
//# sourceMappingURL=permission.route.js.map