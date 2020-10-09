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
exports.PermissionController = void 0;
const cookingrecipe_1 = __importDefault(require("../database/cookingrecipe"));
const description_1 = require("../description/description");
class PermissionController {
    createPermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let jwtPayLoad = req.jwtPayLoad;
            let transaction = yield cookingrecipe_1.default.sequelize.transaction();
            let body = req.body;
            try {
                let createPermission = yield cookingrecipe_1.default.Permission.create({
                    name: body.name,
                    status: 1
                }, { transaction });
                transaction.commit();
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
}
exports.PermissionController = PermissionController;
//# sourceMappingURL=permission.controller.js.map