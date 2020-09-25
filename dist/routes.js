"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const fileImage_routes_1 = require("./routes/fileImage.routes");
function routes(app) {
    app.route("/").get((req, res) => {
        res.render("index");
    });
    fileImage_routes_1.FileImageRoute("/api/Image", app);
}
exports.routes = routes;
//# sourceMappingURL=routes.js.map