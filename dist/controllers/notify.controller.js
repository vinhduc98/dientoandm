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
exports.NotifyController = void 0;
const cookingrecipe_1 = __importDefault(require("../database/cookingrecipe"));
const description_1 = require("../description/description");
class NotifyController {
    getNotifybyaccountId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let jwtPayLoad = req.jwtPayLoad;
            let notifies = [];
            try {
                let getNotifies = yield cookingrecipe_1.default.Notify.findAll({
                    where: {
                        accountId: jwtPayLoad.id
                    },
                    order: [['updatedAt', 'DESC']]
                });
                for (let i = 0; i < getNotifies.length; i++) {
                    notifies.push(getNotifies[i]);
                }
                return res.status(200).send({
                    status: 1,
                    description: "Ok",
                    notifies
                });
            }
            catch (error) {
                description_1.ErrorGeneral(error, 200, req, res, next);
            }
        });
    }
}
exports.NotifyController = NotifyController;
//# sourceMappingURL=notify.controller.js.map