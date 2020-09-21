"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
function routes(app) {
    app.route("/").get((req, res) => {
        res.render("index");
    });
}
exports.routes = routes;
//# sourceMappingURL=routes.js.map