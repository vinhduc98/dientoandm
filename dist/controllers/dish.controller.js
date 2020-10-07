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
const destroyfilecloudinary_1 = require("../functionManage/destroyfilecloudinary");
class DishController {
    createDish(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
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
                    accountId: body.accountId
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
                        comments: []
                    };
                    let listimg = yield cookingrecipe_1.default.DishImg.findAll({ where: {
                            dishId: getAlldish[i].id
                        } });
                    let listcmt = yield cookingrecipe_1.default.Comment.findAll({ where: {
                            dishId: getAlldish[i].id
                        } });
                    for (let m = 0; m < listimg.length; m++) {
                        dish.imgs.push(listimg[m].getDataValue('imgUrlImg'));
                    }
                    for (let n = 0; n < listcmt.length; n++) {
                        dish.comments.push({ author: listcmt[n].author, rating: listcmt[n].rating, comment: listcmt[n].comment });
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
            let functionHandle = new destroyfilecloudinary_1.FunctionHandle();
            let transaction = yield cookingrecipe_1.default.sequelize.transaction();
            try {
                yield cookingrecipe_1.default.Dish.update({
                    name: body.name,
                    label: body.label,
                    description: body.description,
                    featured: body.featured,
                    category: body.category,
                    price: body.price,
                }, {
                    where: {
                        id: dishId
                    }, transaction
                });
                if (body.imgs !== undefined) {
                    yield cookingrecipe_1.default.DishImg.destroy({ where: {
                            dishId
                        }, transaction });
                    let imgs = body.imgs;
                    if (imgs.length > 0) {
                        for (let i = 0; i < imgs.length; i++) {
                            let getImg = yield cookingrecipe_1.default.Img.findOne({ where: {
                                    url_img: imgs[i]
                                } });
                            if (getImg !== null) {
                                // Tạo lại Dishimg
                                yield cookingrecipe_1.default.DishImg.create({
                                    dishId,
                                    imgUrlImg: getImg.url_img
                                }, { transaction });
                            }
                            else {
                                return res.status(200).send({
                                    status: 0,
                                    description: 'Hình ảnh chưa được cập nhật lên server - yêu cầu kiểm tra lại'
                                });
                            }
                        }
                    }
                    // Xóa ảnh từ server quản lý ảnh
                    let ArrDishImg = [];
                    let avatar = yield cookingrecipe_1.default.Account.findOne({
                        attributes: ['avatar'],
                        where: { id: jwtPayLoad.id }
                    });
                    let getImgbyuser = yield cookingrecipe_1.default.Img.findAll({
                        attributes: ['url_img'],
                        where: {
                            createUser: jwtPayLoad.username
                        }
                    });
                    let getDishimg = yield cookingrecipe_1.default.DishImg.findAll({
                        attributes: ['imgUrlImg'],
                        where: {
                            dishId
                        }
                    });
                    getDishimg.forEach((element) => {
                        ArrDishImg.push(element.imgUrlImg);
                    });
                    for (let i = 0; i < getImgbyuser.length; i++) {
                        if (ArrDishImg.indexOf(getImgbyuser[i].url_img) <= -1 && getImgbyuser[i].url_img !== avatar.avatar) {
                            functionHandle.DestroyedFileImgOnCloudinary(getImgbyuser[i].url_img);
                            yield cookingrecipe_1.default.Img.destroy({
                                where: { url_img: getImgbyuser[i].url_img }, transaction
                            });
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
            let functionHandle = new destroyfilecloudinary_1.FunctionHandle();
            let jwtPayLoad = req.jwtPayLoad;
            let transaction = yield cookingrecipe_1.default.sequelize.transaction();
            try {
                let destroyDish = yield cookingrecipe_1.default.Dish.destroy({
                    where: {
                        id: dishId
                    }, transaction
                });
                if (destroyDish === 1) {
                    // Xóa bảng dishImg
                    yield cookingrecipe_1.default.DishImg.destroy({
                        where: {
                            dishId
                        }, transaction
                    });
                    // Lấy tất cả hình do user tạo
                    let getImgbyuser = yield cookingrecipe_1.default.Img.findAll({
                        where: {
                            createUser: jwtPayLoad.username
                        }
                    });
                    // Lấy avatar
                    let avatar = yield cookingrecipe_1.default.Account.findOne({
                        attributes: ['avatar'],
                        where: { id: jwtPayLoad.id }
                    });
                    for (let i = 0; i < getImgbyuser.length; i++) {
                        if (getImgbyuser[i].url_img !== avatar.avatar) {
                            // Xóa tất cả hình tron Img
                            functionHandle.DestroyedFileImgOnCloudinary(getImgbyuser[i].url_img);
                            yield cookingrecipe_1.default.Img.destroy({
                                where: {
                                    url_img: getImgbyuser[i].url_img
                                }, transaction
                            });
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
}
exports.DishController = DishController;
//# sourceMappingURL=dish.controller.js.map