"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbcookingrecipe = void 0;
exports.dbcookingrecipe = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "12345",
    DB: "cookingrecipe",
    pool: {
        max: 25,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
//# sourceMappingURL=db.config.js.map