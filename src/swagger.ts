import {login,logout} from "./swagger/auth.swagger";
import {uploadImage} from "./swagger/file.swagger";
import {getAlldish,createDish} from "./swagger/dish.swagger";
import {createAccount,getAccountInfo} from "./swagger/account.swagger";
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
        name:"Auth",
        description:"Everything about Auth"
      },
      {
        name:"Account",
        description:"Everything about Account"
      },
      {
        name:"Dish",
        description:"Everything about Dish"
      },
      {
        name:"File",
        description:"Everything about File"
      }
    ],
    paths:{
      "/api/auth/Login":{
        post:login
      },
      "/api/auth/Logout":{
        post:logout
      },
      "/api/Account/createAccount":{
        post:createAccount
      },
      "/api/Account/getAccountInfo":{
        get:getAccountInfo
      },
      "/api/Dish/getAllDish":{
        get:getAlldish
      },
      "/api/Dish/createDish":{
        post:createDish
      },
      "/api/Image/UploadImage":{
        post: uploadImage
      }
    }

}