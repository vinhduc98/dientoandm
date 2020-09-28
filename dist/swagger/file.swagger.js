"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
exports.uploadImage = {
    tags: ["File"],
    security: [
        {
            BearerAuth: [],
        },
    ],
    consumes: ["multipart/form-data"],
    requestBody: {
        description: "",
        require: true,
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        photo: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "binary"
                            }
                            // required: true,
                            // description: "File to upload"
                        }
                    }
                }
            }
        }
    },
    responses: {
        "200": {
            description: "response",
            content: {
                "application/json": {
                    example: {
                        status: 1,
                        description: "Ok",
                        data: ['https://res.cloudinary.com/adsun/image/upload/v1601094582/yfjbzf4d6nruxgsabsxu.jpg']
                    }
                }
            }
        },
        "500": {
            description: "Upload Photo Error"
        }
    }
};
//# sourceMappingURL=file.swagger.js.map