"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
exports.login = {
    tags: ["Auth"],
    requestBody: {
        description: "Hiện tại chỉ tạo token nhưng chưa áp dụng vào",
        require: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        username: {
                            type: "string",
                            description: "tên người dùng"
                        },
                        pwd: {
                            type: "string",
                            description: "mật khẩu"
                        }
                    }
                },
                example: {
                    username: "admin",
                    pwd: "123"
                }
            }
        }
    },
    responses: {
        "200": {
            description: "response",
            content: {
                "application/json": {
                    schema: {
                        type: "object"
                    },
                    example: {
                        status: 1,
                        description: "Ok",
                        data: {
                            id: "id",
                            name: "tên account",
                            type: 1,
                            username: "username",
                            avatar: "https://res.cloudinary.com/adsun/image/upload/v1601212865/wxnqvhz9ye89bqwaj7xg.png",
                            token: "mã accesstoken"
                        }
                    }
                }
            }
        }
    }
};
exports.logout = {
    tags: ["Auth"],
    security: [
        {
            BearerAuth: []
        }
    ],
    responses: {
        "200": {
            description: "response",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        description: "Yêu cầu phải có token"
                    },
                    example: {
                        status: 1,
                        description: "Logout thành công"
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=auth.swagger.js.map