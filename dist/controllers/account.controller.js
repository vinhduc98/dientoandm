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
exports.AccountController = void 0;
const cookingrecipe_1 = __importDefault(require("../database/cookingrecipe"));
const checkregex_1 = require("../functionManage/checkregex");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const description_1 = require("../description/description");
const defaultimg_config_1 = require("../config/defaultimg.config");
const fs_1 = __importDefault(require("fs"));
class AccountController {
    createAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield cookingrecipe_1.default.sequelize.transaction();
            const regex = new checkregex_1.RegexHandle();
            const body = req.body;
            try {
                if ((yield regex.kiemTraChuoiCoDau(body.username)) === true || (yield regex.kiemTraChuoiCoDau(body.pwd)) === true) {
                    return res.status(200).send({
                        status: 0,
                        description: "không thể tạo username và password có dấu"
                    });
                }
                let createAccount = yield cookingrecipe_1.default.Account.create({
                    username: body.username,
                    pwd: bcryptjs_1.default.hashSync(body.pwd, 10),
                    name: body.name,
                    sex: body.sex,
                    type: body.type,
                    dateOfBirth: body.dateOfBirth,
                    avatar: defaultimg_config_1.img.iconlogin
                }, { transaction });
                transaction.commit();
                return res.status(200).send({
                    status: 1,
                    description: "Ok"
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
    getAccountInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let jwtPayLoad = req.jwtPayLoad;
            let id = jwtPayLoad.id;
            let user = {};
            try {
                const account = yield cookingrecipe_1.default.Account.findOne({ where: {
                        id
                    } });
                if (account) {
                    user = {
                        id: account.id,
                        username: account.username,
                        name: account.name,
                        avatar: account.avatar,
                        type: account.type,
                        favorites: []
                    };
                    const favo = yield cookingrecipe_1.default.Favorite.findAll({ where: {
                            accountId: account.id
                        } });
                    for (let i = 0; i < favo.length; i++) {
                        if (user.favorites.indexOf(favo[i].dishId) <= -1) {
                            user.favorites.push(favo[i].dishId);
                        }
                    }
                }
                else {
                    user = {};
                }
                return res.status(200).send({
                    status: 1,
                    description: "Ok",
                    user
                });
            }
            catch (error) {
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
    changeAvatar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            let jwtPayLoad = req.jwtPayLoad;
            let transaction = yield cookingrecipe_1.default.sequelize.transaction();
            try {
                let oldAvatar = body.oldAvatar;
                let newAvatar = body.newAvatar;
                const avatar = yield cookingrecipe_1.default.Account.findOne({
                    where: {
                        id: jwtPayLoad.id,
                        avatar: oldAvatar
                    }
                });
                if (avatar === null) {
                    return res.status(200).send({
                        status: 0,
                        description: 'Lỗi web! avatar muốn thay đổi không phải là của account này'
                    });
                }
                const getImg = yield cookingrecipe_1.default.Img.findOne({
                    where: {
                        url_img: newAvatar
                    }
                });
                if (getImg === null) {
                    return res.status(200).send({
                        status: 0,
                        description: 'Hình ảnh chưa được cập nhật lên server - yêu cầu kiểm tra lại'
                    });
                }
                else {
                    // update lại avatar mới
                    yield cookingrecipe_1.default.Account.update({
                        avatar: newAvatar
                    }, {
                        where: {
                            id: jwtPayLoad.id
                        }, transaction
                    });
                    // iconlogin là icon mặc định không được xóa ở server cũng như db
                    if (oldAvatar !== defaultimg_config_1.img.iconlogin) {
                        fs_1.default.unlinkSync("uploads/" + oldAvatar);
                        yield cookingrecipe_1.default.Img.destroy({ where: {
                                url_img: oldAvatar
                            }, transaction });
                    }
                    transaction.commit();
                    return res.status(200).send({
                        status: 1,
                        description: "Ok"
                    });
                }
            }
            catch (error) {
                if (transaction) {
                    transaction.rollback();
                }
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
    updateAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield cookingrecipe_1.default.sequelize.transaction();
            let body = req.body;
            let jwtPayLoad = req.jwtPayLoad;
            try {
                let updateAccount = yield cookingrecipe_1.default.Account.update({
                    name: body.name,
                }, { where: {
                        id: jwtPayLoad.id
                    } });
                if (body.favorites !== undefined) {
                    let favorites = body.favorites;
                    // xóa tất cả các favorite của id này
                    yield cookingrecipe_1.default.Favorite.destroy({
                        where: {
                            accountId: jwtPayLoad.id
                        }, transaction
                    });
                    if (favorites.length > 0) {
                        for (let i = 0; i < favorites.length; i++) {
                            yield cookingrecipe_1.default.Favorite.create({
                                accountId: jwtPayLoad.id,
                                dishId: favorites[i]
                            }, { transaction });
                        }
                    }
                }
                transaction.commit();
                return res.status(200).send({
                    status: 1,
                    description: "Ok"
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
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let jwtPayLoad = req.jwtPayLoad;
            let body = req.body;
            let account = yield cookingrecipe_1.default.Account.findOne({ where: { id: jwtPayLoad.id } });
            const regex = new checkregex_1.RegexHandle();
            try {
                let isPwdvalid = bcryptjs_1.default.compareSync(body.oldPwd, account.pwd);
                if (!isPwdvalid || (yield regex.kiemTraChuoiCoDau(body.oldPwd)) === true) {
                    return res.status(200).send({
                        status: 0,
                        description: "Mật khẩu cũ không tồn tại"
                    });
                }
                if (body.oldPwd === body.newPwd) {
                    return res.status(200).send({
                        status: 0,
                        description: "Mật khẩu trùng với mật khẩu mới"
                    });
                }
                if ((yield regex.kiemTraChuoiCoDau(body.newPwd)) === true) {
                    return res.status(200).send({
                        status: 0,
                        description: "Mật khẩu không được có dấu"
                    });
                }
                yield cookingrecipe_1.default.Account.update({
                    pwd: bcryptjs_1.default.hashSync(body.newPwd, 10)
                }, {
                    where: {
                        id: jwtPayLoad.id
                    }
                });
                return res.status(200).send({
                    status: 1,
                    description: "Ok"
                });
            }
            catch (error) {
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
    getAllAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield cookingrecipe_1.default.Account.findAll({
                    attributes: ['id', 'username', 'name', 'dateOfBirth', 'sex', 'avatar', 'type']
                });
                return res.status(200).send({
                    status: 1,
                    description: "Ok",
                    accounts
                });
            }
            catch (error) {
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
}
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map