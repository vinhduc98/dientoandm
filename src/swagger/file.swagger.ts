export const uploadImage:any={
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
                                    items:{
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
                    data:['1604393481370.png']
                }
            }
            }
        },
        "500": {
            description: "Upload Photo Error"
        }
    }
}

export const uploadImageNew:any={
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
                            image: {
                                    type: "array",
                                    items:{
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
                    data:['1604393481370.png']
                }
            }
            }
        },
        "500": {
            description: "Upload Photo Error"
        }
    }
}