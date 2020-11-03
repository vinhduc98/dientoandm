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
const defaultimg_config_1 = require("../config/defaultimg.config");
const fs_1 = __importDefault(require("fs"));
class DishController {
    createDish(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const jwt = req.jwtPayLoad;
            let transaction = yield cookingrecipe_1.default.sequelize.transaction();
            try {
                let createDish = yield cookingrecipe_1.default.Dish.create({
                    name: body.name,
                    label: body.label,
                    featured: body.featured,
                    category: body.category,
                    price: body.price,
                    imgs: body.imgs,
                    description: body.description,
                    commentState: 1,
                    accountId: jwt.id
                });
                const imgs = body.imgs;
                if (imgs.length > 0) {
                    for (let i = 0; i < imgs.length; i++) {
                        let getImg = yield cookingrecipe_1.default.Img.findOne({
                            where: {
                                url_img: imgs[i]
                            }, transaction
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
                                imgUrlImg: imgs[i]
                            }, { transaction });
                        }
                    }
                }
                transaction.commit();
                return res.status(200).send({
                    status: 1,
                    description: 'Ok'
                });
            }
            catch (error) {
                if (transaction) {
                    transaction.rollback();
                }
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
                        imgs: [],
                        // comments:[],
                        commentState: getAlldish[i].commentState,
                        createdDate: getAlldish[i].createdAt
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
    updateDish(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let dishId = req.params.dishId;
            let jwtPayLoad = req.jwtPayLoad;
            let body = req.body;
            let transaction = yield cookingrecipe_1.default.sequelize.transaction();
            try {
                yield cookingrecipe_1.default.Dish.update({
                    name: body.name,
                    label: body.label,
                    description: body.description,
                    featured: body.featured,
                    category: body.category,
                    commentState: body.commentState,
                    price: body.price,
                }, {
                    where: {
                        id: dishId
                    }, transaction
                });
                let imgs = body.imgs;
                if (defaultimg_config_1.img !== undefined) {
                    let arrDishImg = [];
                    let imgDish = yield cookingrecipe_1.default.DishImg.findAll({
                        where: {
                            dishId
                        }
                    });
                    // Xóa hết danh sách DishImg
                    yield cookingrecipe_1.default.DishImg.destroy({
                        where: {
                            dishId
                        }, transaction
                    });
                    if (imgs.length >= 0) {
                        for (let i = 0; i < imgDish.length; i++) {
                            // Nếu imgDish không nằm trong imgs
                            if (imgs.indexOf(imgDish[i].imgUrlImg) <= -1) {
                                // Xóa tất cả các img cũ
                                yield cookingrecipe_1.default.Img.destroy({
                                    where: {
                                        url_img: imgDish[i].imgUrlImg
                                    }, transaction
                                });
                                // Xóa tất của các DishImg cũ
                                yield cookingrecipe_1.default.DishImg.destroy({
                                    where: {
                                        imgUrlImg: imgDish[i].imgUrlImg
                                    }, transaction
                                });
                                // Xóa file img
                                fs_1.default.unlinkSync("uploads/" + imgDish[i].imgUrlImg);
                            }
                        }
                        // Lấy lại danh sách ImgDish sau khi đã thanh lọc
                        let imgDishSub = yield cookingrecipe_1.default.DishImg.findAll({
                            where: {
                                dishId
                            }
                        });
                        for (let k = 0; k < imgDishSub.length; k++) {
                            arrDishImg.push(imgDishSub[k]);
                        }
                        // imgDishSub.forEach(async(element:any) => {
                        //     arrDishImg.push(element.imgUrlImg)
                        // });
                        for (let j = 0; j < imgs.length; j++) {
                            if (arrDishImg.indexOf(imgs[j]) <= -1) {
                                yield cookingrecipe_1.default.DishImg.create({
                                    dishId,
                                    imgUrlImg: imgs[j]
                                }, { transaction });
                            }
                        }
                    }
                }
                transaction.commit();
                return res.status(200).send({
                    status: 1,
                    description: "Ok",
                });
            }
            catch (error) {
                if (transaction) {
                    transaction.rollback();
                }
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
    deleteDish(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let dishId = req.params.dishId;
            let transaction = yield cookingrecipe_1.default.sequelize.transaction();
            try {
                let destroyDish = yield cookingrecipe_1.default.Dish.destroy({
                    where: {
                        id: dishId
                    }, transaction
                });
                if (destroyDish === 1) {
                    // Xóa bảng dishImg
                    let getDishImg = yield cookingrecipe_1.default.DishImg.findAll({
                        attributes: ['imgUrlImg'],
                        where: {
                            dishId
                        }
                    });
                    for (let i = 0; i < getDishImg.length; i++) {
                        yield cookingrecipe_1.default.Img.destroy({
                            where: {
                                url_img: getDishImg[i].imgUrlImg
                            }
                        });
                        fs_1.default.unlinkSync("uploads/" + getDishImg[i].imgUrlImg);
                    }
                    yield cookingrecipe_1.default.DishImg.destroy({
                        where: {
                            dishId
                        }
                    });
                }
                transaction.commit();
                return res.status(200).send({
                    status: 1,
                    description: "Ok",
                });
            }
            catch (error) {
                if (transaction) {
                    transaction.rollback();
                }
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
}
exports.DishController = DishController;
//# sourceMappingURL=dish.controller.js.map