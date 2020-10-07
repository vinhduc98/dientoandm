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
exports.checkDishMyselfCreate = void 0;
const cookingrecipe_1 = __importDefault(require("../database/cookingrecipe"));
exports.checkDishMyselfCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let dishId = req.params.dishId;
    let jwtPayLoad = req.jwtPayLoad;
    let getDish = yield cookingrecipe_1.default.Dish.findOne({
        where: {
            id: dishId
        }
    });
    if (getDish !== null) {
        if (getDish.getDataValue('accountId') === jwtPayLoad.id) {
            next();
        }
        else {
            return res.status(200).send({
                status: 0,
                description: "Không được phép sửa hoặc xóa dish của người khác"
            });
        }
    }
    else {
        return res.status(200).send({
            status: 0,
            description: `Dish ${dishId} không tồn tại`
        });
    }
});
//# sourceMappingURL=check_dish_myself_create.middlesware.js.map