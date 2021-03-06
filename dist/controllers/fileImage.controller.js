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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileImageController = void 0;
const fs_1 = __importDefault(require("fs"));
const cookingrecipe_1 = __importDefault(require("../database/cookingrecipe"));
const server_config_1 = require("../config/server.config");
let cloudinary = require('cloudinary').v2;
class FileImageController {
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let jwtPayLoad = req.jwtPayLoad;
            try {
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
                        if (err) {
                            return res.status(200).send({
                                status: 0,
                                description: 'File upload error',
                                data: []
                            });
                        }
                        arrSecureurl.push(result.secure_url);
                        yield cookingrecipe_1.default.Img.create({
                            url_img: result.secure_url,
                            createUser: jwtPayLoad.username
                        });
                    }));
                }
                console.log(arrSecureurl);
                return res.status(200).send({
                    status: 1,
                    description: 'Ok',
                    data: arrSecureurl
                });
            }
            catch (error) {
                return res.status(200).send({
                    status: 0,
                    description: 'Server error or unsuitable file format (requires .png, .jpg, ...)',
                    data: []
                });
            }
        });
    }
    uploadImageTest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let jwtPayLoad = req.jwtPayLoad;
                let arrayFile = [];
                let files = req.files;
                for (let i = 0; i < files.length; i++) {
                    let type = files[i].mimetype.split('/')[1].toLowerCase();
                    if (type !== 'png' && type !== 'jpg' && type !== 'jpeg') {
                        console.log(files[i].path);
                        fs_1.default.unlinkSync(files[i].path);
                        return res.status(200).send({
                            status: 0,
                            description: 'Chúng tôi chỉ chấp nhận định dạng .png .jpg .jpeg'
                        });
                    }
                    else {
                        yield cookingrecipe_1.default.Img.create({
                            url_img: files[i].filename,
                            createUser: jwtPayLoad.username
                        });
                        arrayFile.push(files[i].filename);
                    }
                }
                return res.status(200).json({
                    status: 1,
                    description: 'Ok',
                    data: arrayFile
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    openImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let imageName = "uploads/" + req.params.image_name;
            fs_1.default.readFile(imageName, (err, imageData) => {
                if (err) {
                    return res.status(200).send({
                        status: 0,
                        description: `Không thể đọc file hình :${err}`
                    });
                }
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(imageData);
            });
        });
    }
}
exports.FileImageController = FileImageController;
//# sourceMappingURL=fileImage.controller.js.map