"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeFavorite = exports.getFavoriteByDishId = void 0;
exports.getFavoriteByDishId = {
    tags: ["Favorite"],
    description: "Lấy danh sách yêu thích theo DishId",
    parameters: [
        {
            in: "path",
            name: "dishId",
            require: true,
            schema: {
                type: "int",
            }
        },
    ],
    responses: {
        "200": {
            description: "Lấy danh sách yêu thích theo dishId",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                    },
                    example: {
                        status: 1,
                        description: "Ok",
                        users: [
                            {
                                id: 6,
                                name: "Nguyên đổ bóng"
                            }
                        ],
                        count: 1
                    }
                }
            }
        }
    }
};
exports.changeFavorite = {
    tags: ["Favorite"],
    security: [
        {
            BearerAuth: [],
        },
    ],
    requestBody: {
        description: "Change favorite trong 1 dish",
        require: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        status: {
                            type: "int",
                            description: "status = 1 là click yêu thích, status = 0 là bỏ yêu thích"
                        },
                        dishId: {
                            type: "int",
                            description: "Id của Dish"
                        },
                    },
                },
                example: {
                    status: 1,
                    dishId: 7
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
                        type: "object",
                    },
                    example: {
                        status: 1,
                        description: "Ok"
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=favorite.swagger.js.map