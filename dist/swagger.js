"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = void 0;
const auth_swagger_1 = require("./swagger/auth.swagger");
const file_swagger_1 = require("./swagger/file.swagger");
const dish_swagger_1 = require("./swagger/dish.swagger");
const account_swagger_1 = require("./swagger/account.swagger");
exports.swaggerDocument = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "AppChat API CloudComputing",
        description: "",
        termsOfService: "",
        contact: {
            name: "",
            email: "",
            url: "",
        },
    },
    components: {
        schemas: {},
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    tags: [
        {
            name: "Auth",
            description: "Everything about Auth"
        },
        {
            name: "Account",
            description: "Everything about Account"
        },
        {
            name: "Dish",
            description: "Everything about Dish"
        },
        {
            name: "File",
            description: "Everything about File"
        }
    ],
    paths: {
        "/api/auth/Login": {
            post: auth_swagger_1.login
        },
        "/api/auth/Logout": {
            post: auth_swagger_1.logout
        },
        "/api/Account/createAccount": {
            post: account_swagger_1.createAccount
        },
        "/api/Account/getAccountInfo": {
            get: account_swagger_1.getAccountInfo
        },
        "/api/Dish/getAllDish": {
            get: dish_swagger_1.getAlldish
        },
        "/api/Dish/createDish": {
            post: dish_swagger_1.createDish
        },
        "/api/Image/UploadImage": {
            post: file_swagger_1.uploadImage
        }
    }
};
//# sourceMappingURL=swagger.js.map