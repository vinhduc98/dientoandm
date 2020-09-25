"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileImageController = void 0;
const server_config_1 = require("../config/server.config");
let cloudinary = require('cloudinary').v2;
class FileImageController {
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let arrFile = [];
            let arrSecureurl = [];
            cloudinary.config(server_config_1.cloudinaryary);
            const file = req.files.photo;
            if (typeof (file) === 'object') {
                if (file.length === undefined) {
                    arrFile.push(file);
                }
                else {
                    arrFile = file;
                }
            }
            for (let i = 0; i < arrFile.length; i++) {
                yield cloudinary.uploader.upload(arrFile[i].tempFilePath, (err, result) => __awaiter(this, void 0, void 0, function* () {
                    arrSecureurl.push(result.secure_url);
                }));
            }
            console.log(arrSecureurl);
            return res.status(200).send({
                status: 1,
                description: 'Ok',
                data: arrSecureurl
            });
        });
    }
}
exports.FileImageController = FileImageController;
//# sourceMappingURL=fileImage.controller.js.map