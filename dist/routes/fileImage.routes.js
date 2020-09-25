"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileImageRoute = void 0;
const fileImage_controller_1 = require("../controllers/fileImage.controller");
function FileImageRoute(url, app) {
    const fileimage = new fileImage_controller_1.FileImageController();
    app.route(`${url}/UploadImage`).post(fileimage.uploadImage);
    app.route(`${url}/getImage`).get(fileimage.getImage);
    app.route(`${url}/test`).get(fileimage.test);
}
exports.FileImageRoute = FileImageRoute;
//# sourceMappingURL=fileImage.routes.js.map