export const uploadImage:any={
    tags: ["File"],
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
                                type: "file",
                                required: true,
                                description: "File to upload"
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
                    data:['upload_a4755d91fa72bc6440527292f126fdc2.png']
                }
            }
            }
        },
        "500": {
            description: "Upload Photo Error"
        }
    }
}