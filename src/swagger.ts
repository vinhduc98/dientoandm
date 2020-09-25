import {uploadImage} from "./swagger/file.swagger"
export const swaggerDocument ={
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
    tags:[
      {
        name:"File",
        description:"Everything about File"
      }
    ],
    paths:{
      "/api/Image/UploadImage":{
        post: uploadImage
      }
    }

}