"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = void 0;
const file_swagger_1 = require("./swagger/file.swagger");
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
            name: "File",
            description: "Everything about File"
        }
    ],
    paths: {
        "/api/Image/UploadImage": {
            post: file_swagger_1.uploadImage
        }
    }
};
//# sourceMappingURL=swagger.js.map