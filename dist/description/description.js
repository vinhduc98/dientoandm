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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorGeneral = void 0;
let tableNameoferror = function checkBelongtoDatabase(err, req, res) {
    let message;
    if (err.name === "SequelizeUniqueConstraintError") {
        if (err.errors[0].message.indexOf("accounts") !== -1) {
            message = "Tài khoản";
        }
        else if (err.errors[0].message.indexOf("favorites") !== -1) {
            message = "Yêu thích";
        }
        else {
            message = "Đối tượng";
        }
    }
    if (err.name === "SequelizeForeignKeyConstraintError") {
        if (err.parent.sqlMessage.indexOf("accountId") !== -1) {
            message = `Người dùng`;
        }
        if (err.parent.sqlMessage.indexOf("dishId") !== -1) {
            message = `Thực đơn`;
        }
    }
    return message;
};
exports.ErrorGeneral = (err, status, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (err.name === null || err.name === "" || err.name === undefined) {
        return res.status(status).send({
            status: 0,
            description: "Lỗi xảy ra do quá trình thao tác dữ liệu",
        });
    }
    else {
        if (err.name === "SequelizeUniqueConstraintError") {
            let listValue;
            for (let i = 0; i < err.errors.length; i++) {
                listValue = err.errors[i].value;
            }
            return res.status(status).send({
                status: 0,
                description: `${tableNameoferror(err, req, res)} ${listValue} hiện tại đã tồn tại!`,
            });
        }
        if (err.name === "SequelizeDatabaseError") {
            return res.status(status).send({
                status: 0,
                description: "Dữ liệu hiện tại bị lỗi",
                err
            });
        }
        if (err.name === "SequelizeTimeoutError") {
            return res.status(status).send({
                status: 0,
                description: "Hết thời gian thao tác"
            });
        }
        if (err.name === "SequelizeForeignKeyConstraintError") {
            return res.status(status).send({
                status: 0,
                description: `${tableNameoferror(err, req, res)} ${err.value} vừa lựa chọn không tồn tại`
            });
        }
        if (err.name === "SequelizeValidationError") {
            return res.status(status).send({
                status: 0,
                description: `Lỗi website do quá trình thao tác dữ liệu`,
                err
            });
        }
        else {
            return res.status(status).send({
                status: 0,
                description: `Lỗi server`,
                err
            });
        }
    }
});
//# sourceMappingURL=description.js.map