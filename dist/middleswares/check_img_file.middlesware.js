"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImgFile = void 0;
const fs_1 = __importDefault(require("fs"));
exports.checkImgFile = (req, res, next) => {
    let imgs = req.body.imgs;
    try {
        for (let i = 0; i < imgs.length; i++) {
            let checkfs = fs_1.default.statSync("uploads/" + imgs[i]);
        }
    }
    catch (error) {
        return res.status(200).send({
            status: 0,
            description: error.path + " không tồn tại ở phía server!!!",
        });
    }
    next();
};
//# sourceMappingURL=check_img_file.middlesware.js.map