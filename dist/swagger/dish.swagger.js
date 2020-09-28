"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDish = exports.getAlldish = void 0;
exports.getAlldish = {
    tags: ["Dish"],
    description: "Lấy thông tin tất cả các dish",
    responses: {
        "200": {
            description: "Danh sách dish này cả người ngoài và user đều có thể xem",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                    },
                    example: {
                        status: 1,
                        description: "Ok",
                        dishes: [
                            {
                                id: "id",
                                name: "tên dish",
                                label: "New",
                                description: "description của dish",
                                featured: "Kiểu bool, nêu true sẽ đưa lên đầu trang",
                                category: "Loại dish",
                                price: "Giá",
                                accountId: "tên account post dish lên",
                                imgs: ["url_img1", "url_img2", "url_img3"],
                                comments: ["comment1, comment2, comment3"]
                            }
                        ]
                    }
                }
            }
        }
    }
};
exports.createDish = {
    tags: ["Dish"],
    security: [
        {
            BearerAuth: [],
        },
    ],
    requestBody: {
        description: "Tạo mới 1 Dish",
        require: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "Tên của dish"
                        },
                        label: {
                            type: "string",
                            description: "nhãn dán gì gì đó - mặc định là chuỗi rỗng ('') "
                        },
                        featured: {
                            type: "boolean",
                            description: "feature = true thì sẽ được đưa lên trang đầu"
                        },
                        category: {
                            type: "string",
                            description: "Loại dish - mặc định là chuỗi rỗng ('')"
                        },
                        price: {
                            type: "double",
                            description: "Giá - mặc đinh là 0"
                        },
                        description: {
                            type: "string",
                            description: "chú thích gì gì đó"
                        },
                        img: {
                            type: "array",
                            description: "danh sách hình để post lên - không có hình thì để rỗng"
                        },
                        accountId: {
                            type: "number",
                            description: "Id account post lên"
                        },
                    },
                },
                example: {
                    name: "Bánh canh cua",
                    label: "Hot",
                    featured: false,
                    category: "mains",
                    price: 4.3,
                    description: "Món ăn mém ngon",
                    img: [],
                    accountId: 2
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
//# sourceMappingURL=dish.swagger.js.map