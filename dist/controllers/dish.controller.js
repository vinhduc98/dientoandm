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
exports.DishController = void 0;
const cookingrecipe_1 = __importDefault(require("../database/cookingrecipe"));
const description_1 = require("../description/description");
class DishController {
    createDish(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                let createDish = yield cookingrecipe_1.default.Dish.create({
                    name: body.name,
                    label: body.label,
                    featured: body.featured,
                    category: body.category,
                    price: body.price,
                    img: body.img,
                    description: body.description,
                    accountId: body.accountId
                });
                const img = body.img;
                if (img.length > 0) {
                    for (let i = 0; i < img.length; i++) {
                        let getImg = yield cookingrecipe_1.default.Img.findOne({
                            where: {
                                url_img: img[i]
                            }
                        });
                        if (getImg === null) {
                            return res.status(200).send({
                                status: 0,
                                description: 'Hình ảnh chưa được cập nhật lên server - yêu cầu kiểm tra lại'
                            });
                        }
                        else {
                            const id = createDish.getDataValue('id');
                            let createDishimg = yield cookingrecipe_1.default.DishImg.create({
                                dishId: id,
                                imgUrlImg: img[i]
                            });
                        }
                    }
                }
                return res.status(200).send({
                    status: 1,
                    description: 'Ok'
                });
            }
            catch (error) {
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
    getAllDish(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getAlldish;
                let dishes = [];
                let dish = {};
                getAlldish = yield cookingrecipe_1.default.Dish.findAll({
                    order: [['updatedAt', 'DESC']]
                });
                for (let i = 0; i < getAlldish.length; i++) {
                    dish = {
                        id: getAlldish[i].id,
                        name: getAlldish[i].name,
                        label: getAlldish[i].label,
                        description: getAlldish[i].description,
                        featured: getAlldish[i].featured,
                        category: getAlldish[i].category,
                        price: getAlldish[i].price,
                        accountId: getAlldish[i].accountId,
                        imgs: []
                    };
                    let listimg = yield cookingrecipe_1.default.DishImg.findAll({ where: {
                            dishId: getAlldish[i].id
                        } });
                    for (let m = 0; m < listimg.length; m++) {
                        dish.imgs.push(listimg[m].getDataValue('imgUrlImg'));
                    }
                    if (dishes.indexOf(dish) <= -1) {
                        dishes.push(dish);
                    }
                }
                return res.status(200).send({
                    status: 1,
                    description: "Ok",
                    dishes
                });
            }
            catch (error) {
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
}
exports.DishController = DishController;
//# sourceMappingURL=dish.controller.js.map