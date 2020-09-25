"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileImageController = void 0;
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = __importDefault(require("fs"));
const server_config_1 = require("../config/server.config");
class FileImageController {
    uploadImage(req, res, next) {
        // parse 1 file uploads
        let form = new formidable_1.default.IncomingForm();
        form.uploadDir = server_config_1.serverConfig.URLImage;
        console.log(form.uploadDir);
        form.keepExtensions = true;
        // 10MB
        form.maxFieldsSize = 10 * 1024 * 1024;
        form.multiples = true;
        form.parse(req);
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(200).send({
                    status: 0,
                    description: `Cannot upload image : ${err}`
                });
            }
            let arrFile = [];
            let fileName;
            if (typeof (files.files) === 'object') {
                if (files.files.length === undefined) {
                    fileName = files.files.path.split('\\')[2];
                    if (fileName.indexOf('.') <= -1) {
                        fs_1.default.unlinkSync(server_config_1.serverConfig.URLImage + fileName);
                        arrFile = [];
                    }
                    else {
                        arrFile.push(fileName);
                    }
                }
                else {
                    for (let i = 0; i < files.files.length; i++) {
                        fileName = files.files[i].path.split('\\')[2];
                        arrFile.push(fileName);
                    }
                }
                console.log(arrFile);
            }
            return res.status(200).send({
                status: 1,
                description: 'Ok',
                data: arrFile
            });
        });
    }
    getImage(req, res, next) {
        let imageName = server_config_1.serverConfig.URLImage + req.query.imageName;
        console.log(imageName);
        fs_1.default.readFile(imageName, (err, imageData) => {
            if (err) {
                return res.status(200).send({
                    status: 0,
                    description: 'Failed to get the file'
                });
            }
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(imageData);
        });
    }
    test(req, res, next) {
        res.status(200).send('Ok');
    }
}
exports.FileImageController = FileImageController;
//# sourceMappingURL=fileImage.controller.js.map