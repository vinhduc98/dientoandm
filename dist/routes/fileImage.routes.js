"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInageRouteNoauthenticate = exports.FileImageRoute = void 0;
const fileImage_controller_1 = require("../controllers/fileImage.controller");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer = require('multer');
function FileImageRoute(url, app) {
    const fileImage = new fileImage_controller_1.FileImageController();
    app.route(`${url}/UploadImage`).post(fileImage.uploadImage);
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            fs_1.default.mkdir('uploads/', (err) => {
                cb(null, 'uploads/');
            });
        },
        filename: (req, file, cb) => {
            console.log(file);
            cb(null, Date.now() + path_1.default.extname(file.originalname));
        }
    });
    const upload = multer({ storage, limits: {
            fileSize: 1024 * 1024 * 5
        } });
    app.route(`${url}/UploadImageNew`).post(upload.array('image'), fileImage.uploadImageTest);
}
exports.FileImageRoute = FileImageRoute;
function FileInageRouteNoauthenticate(url, app) {
    const fileImage = new fileImage_controller_1.FileImageController();
    app.route(`${url}/open_image/:image_name`).get(fileImage.openImage);
}
exports.FileInageRouteNoauthenticate = FileInageRouteNoauthenticate;
//# sourceMappingURL=fileImage.routes.js.map