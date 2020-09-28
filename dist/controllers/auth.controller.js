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
exports.AuthController = void 0;
const cookingrecipe_1 = __importDefault(require("../database/cookingrecipe"));
const checkregex_1 = require("../functionManage/checkregex");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const description_1 = require("../description/description");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_config_1 = require("../config/server.config");
class AuthController {
    Login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new checkregex_1.RegexHandle();
            const body = req.body;
            try {
                let account = yield cookingrecipe_1.default.Account.findOne({
                    attributes: ['id', 'name', 'type', 'username', 'avatar', 'pwd'],
                    where: {
                        username: body.username
                    }
                });
                if (!account || (yield regex.kiemTraChuoiCoDau(body.username)) === true) {
                    return res.status(200).send({
                        status: 0,
                        description: "Sai tài khoản"
                    });
                }
                const passwordIsValid = bcryptjs_1.default.compareSync(body.pwd, account.pwd);
                if (!passwordIsValid || (yield regex.kiemTraChuoiCoDau(body.pwd)) === true) {
                    return res.status(200).send({
                        status: 0,
                        description: "Sai mật khẩu"
                    });
                }
                const accesstoken = jsonwebtoken_1.default.sign({
                    id: account.id,
                    name: account.name,
                    type: account.type,
                    username: account.username,
                }, server_config_1.configToken.SecretKey, { expiresIn: server_config_1.configToken.ExpiresIn });
                // Lưu token vào trong CSDL
                const d = new Date(Date.now());
                d.setSeconds(d.getSeconds() + server_config_1.configToken.ExpiresIn);
                console.log(d);
                const token = {
                    token: accesstoken,
                    username: account.username,
                    expiredIn: d
                };
                yield cookingrecipe_1.default.Token.create(token);
                return res.status(200).send({
                    status: 1,
                    description: "Ok",
                    data: {
                        id: account.id,
                        name: account.name,
                        type: account.type,
                        username: account.username,
                        avatar: account.avatar,
                        token: accesstoken
                    }
                });
            }
            catch (error) {
                console.log(error);
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map