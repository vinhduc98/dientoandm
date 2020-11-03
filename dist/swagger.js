"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = void 0;
const auth_swagger_1 = require("./swagger/auth.swagger");
const file_swagger_1 = require("./swagger/file.swagger");
const dish_swagger_1 = require("./swagger/dish.swagger");
const account_swagger_1 = require("./swagger/account.swagger");
const comment_swagger_1 = require("./swagger/comment.swagger");
const notify_swagger_1 = require("./swagger/notify.swagger");
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
        "/api/Account/changeAvatar": {
            put: account_swagger_1.changeAvatar
        },
        "/api/Account/updateAccount": {
            put: account_swagger_1.updateAccount
        },
        "/api/Account/changePassword": {
            put: account_swagger_1.changePassword
        },
        "/api/Dish/getAllDish": {
            get: dish_swagger_1.getAlldish
        },
        "/api/Dish/createDish": {
            post: dish_swagger_1.createDish
        },
        "/api/Dish/updateDish/{dishId}": {
            put: dish_swagger_1.updateDish
        },
        "/api/Dish/deleteDish/{dishId}": {
            delete: dish_swagger_1.deleteDish
        },
        "/api/Comment/createComment": {
            post: comment_swagger_1.createComment
        },
        "/api/Comment/getCommentByDishId/{dishId}": {
            get: comment_swagger_1.getCommentByDishId
        },
        "/api/Notify/getNotifyByAccountId": {
            get: notify_swagger_1.notify
        },
        "/api/Image/UploadImage": {
            post: file_swagger_1.uploadImage
        },
        "/api/Image/UploadImageNew": {
            post: file_swagger_1.uploadImageNew
        }
    }
};
//# sourceMappingURL=swagger.js.map