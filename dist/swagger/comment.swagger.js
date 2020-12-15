"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentByCommentId = exports.getCommentByDishId = exports.createComment = void 0;
exports.createComment = {
    tags: ["Comment"],
    requestBody: {
        description: "Comment",
        require: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        rating: {
                            type: "double",
                            description: "sao"
                        },
                        comment: {
                            type: "string",
                            description: "Nội dung comment"
                        },
                        author: {
                            type: "string",
                            description: "Người comment, có thể là ẩn danh hoặc thành viên"
                        },
                        dishId: {
                            type: "int",
                            description: "Dish để comment"
                        },
                        isMember: {
                            type: "int",
                            description: "= 0 (là Ẩn Danh), = 1 (là thành viên)"
                        },
                        isChildren: {
                            type: "int",
                            description: "id của comment nào là con của comment đấy"
                        }
                    }
                },
                example: {
                    rating: 3.5,
                    comment: "Nhìn z mà ngon gì chời, dở ẹt, thằng Nguyên bê đê còn ngon hơn thằng Nguyên bóng",
                    author: "agent1",
                    isMember: 0,
                    dishId: 1
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
                        description: "Ok"
                    }
                }
            }
        }
    }
};
exports.getCommentByDishId = {
    tags: ["Comment"],
    description: "Lấy thông tin tất cả các dish",
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
            description: "List comment của từng dish",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                    },
                    example: {
                        status: 1,
                        description: "Ok",
                        comments: [
                            {
                                id: "id",
                                rating: "Đánh giá sao",
                                comment: "viết bình luận",
                                isMember: "là thành viên hay ẩn danh",
                                isChildren: "Con của bình luận nào",
                                dishId: "Loại dish"
                            }
                        ]
                    }
                }
            }
        }
    }
};
exports.getCommentByCommentId = {
    tags: ["Comment"],
    description: "Lấy thông tin comment con",
    parameters: [
        {
            in: "path",
            name: "dishId",
            require: true,
            schema: {
                type: "int"
            }
        }
    ],
    responses: {
        "200": {
            description: "Lấy các comment",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                    },
                    example: {
                        status: 1,
                        description: "Ok",
                        comments: [
                            {
                                id: "id",
                                rating: "Đánh giá sao",
                                comment: "viết bình luận",
                                isMember: "là thành viên hay ẩn danh",
                                isChildren: "Con của bình luận nào",
                                dishId: "Loại dish"
                            }
                        ]
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=comment.swagger.js.map