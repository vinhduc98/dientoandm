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
exports.checkCommentChildrenCreate = void 0;
const cookingrecipe_1 = __importDefault(require("../database/cookingrecipe"));
exports.checkCommentChildrenCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let isChildren = req.body.isChildren;
    let dishId = req.body.dishId;
    let getAllCommentByDishId = yield cookingrecipe_1.default.Comment.findAll({
        where: {
            dishId
        }
    });
    if (isChildren !== 0) {
        for (let i = 0; i < getAllCommentByDishId.length; i++) {
            if (isChildren !== getAllCommentByDishId[i].id) {
                return res.status(200).send({
                    status: 0,
                    description: "Lỗi web!!! Bình luận này không trả lời cho bình luận nào cả (kiểm tra lại isChildren)"
                });
            }
        }
    }
    next();
});
//# sourceMappingURL=check_comment_create.middlesware.js.map