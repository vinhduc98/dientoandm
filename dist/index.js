"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const routes_1 = require("./routes");
const cookingrecipe_1 = __importDefault(require("./database/cookingrecipe"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
let PORT = process.env.PORT || 8000;
const app = express_1.default();
// app.use(fileupload({
//     useTempFiles:true
// }))
// app.use('/uploads', express.static('uploads'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: "5mb" }));
app.use(morgan_1.default("dev"));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument));
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors_1.default());
app.options("*", cors_1.default());
cookingrecipe_1.default.sequelize
    .sync({ force: false, alter: true })
    .then(() => {
    console.log("Connecting database cookingrecipe");
})
    .catch((err) => {
    console.log(err);
});
routes_1.routesNoauthenticate(app);
routes_1.routes(app);
let httpServer = new http_1.default.Server(app);
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
//# sourceMappingURL=index.js.map