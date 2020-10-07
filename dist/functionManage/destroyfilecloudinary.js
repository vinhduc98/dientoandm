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
exports.FunctionHandle = void 0;
// destroyed file
const server_config_1 = require("../config/server.config");
let cloudinary = require('cloudinary').v2;
class FunctionHandle {
    DestroyedFileImgOnCloudinary(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            let rootfile = filename.split('/')[filename.split('/').length - 1];
            let vitri = rootfile.indexOf('.');
            rootfile = rootfile.slice(0, vitri);
            cloudinary.config(server_config_1.cloudinaryary);
            cloudinary.uploader.destroy(rootfile);
        });
    }
}
exports.FunctionHandle = FunctionHandle;
//# sourceMappingURL=destroyfilecloudinary.js.map