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
                    type: body.type,
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
            let transaction = yield cookingrecipe_1.default.sequelize.transaction();
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
                transaction.commit();
                return res.status(200).send({
                    status: 1,
                    description: "Ok",
                    user
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
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map