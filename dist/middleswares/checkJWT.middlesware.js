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
exports.checkJWTDb = exports.checkJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookingrecipe_1 = __importDefault(require("../database/cookingrecipe"));
const server_config_1 = require("../config/server.config");
exports.checkJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization === null || req.headers.authorization === "" || req.headers.authorization === undefined) {
        return res.status(401).send({
            status: 0,
            description: "Key token chưa xác thực"
        });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).send({
            status: 0,
            description: "Mã token xác thực không đúng"
        });
    }
    // Kiểm tra token có nằm trong csdl mới cho sử dụng
    req.token = token;
    const tk = yield cookingrecipe_1.default.Token.findOne({
        where: {
            token: req.token
        }
    });
    if (!tk) {
        return res.status(401).send({
            status: 0,
            description: "token hiện tại không sử dụng được"
        });
    }
    if (req.headers.authorization.split(" ")[0] === 'Bearer') {
        let jwtPayLoad;
        try {
            jwtPayLoad = jsonwebtoken_1.default.verify(token, server_config_1.configToken.SecretKey);
            req.jwtPayLoad = jwtPayLoad;
        }
        catch (error) {
            yield cookingrecipe_1.default.Token.destroy({ where: {
                    token
                } });
            return res.status(401).send({
                status: 0,
                description: "Token hiện tại hết hạn"
            });
        }
    }
    next();
});
exports.checkJWTDb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let jwtPayLoad = req.jwtPayLoad;
    let username = jwtPayLoad.username;
    const getToken = yield cookingrecipe_1.default.Token.findAll({
        where: {
            username
        }
    });
    for (let i = 0; i < getToken.length; i++) {
        if (Date.now() >= getToken[i].expiredIn.getTime()) {
            yield cookingrecipe_1.default.Token.destroy({ where: {
                    token: getToken[i].token
                } });
        }
    }
    next();
});
//# sourceMappingURL=checkJWT.middlesware.js.map