"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const app = express_1.default();
exports.app = app;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: "5mb" }));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument));
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors_1.default());
app.options("*", cors_1.default());
let httpServer = new http_1.default.Server(app);
routes_1.routes(app);
httpServer.listen(8080, function () {
    console.log("listening on *:8080");
});
//# sourceMappingURL=index.js.map