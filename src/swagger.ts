import {login,logout} from "./swagger/auth.swagger";
import {uploadImage} from "./swagger/file.swagger";
import {getAlldish,createDish,updateDish,deleteDish} from "./swagger/dish.swagger";
import {createAccount,getAccountInfo,changeAvatar,updateAccount,changePassword} from "./swagger/account.swagger";
import {createComment} from "./swagger/comment.swagger";
import {notify} from './swagger/notify.swagger';
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
      "/api/Account/changeAvatar":{
        put:changeAvatar
      },
      "/api/Account/updateAccount":{
        put:updateAccount
      },
      "/api/Account/changePassword":{
        put:changePassword
      },
      "/api/Dish/getAllDish":{
        get:getAlldish
      },
      "/api/Dish/createDish":{
        post:createDish
      },
      "/api/Dish/updateDish/{dishId}":{
        put:updateDish
      },
      "/api/Dish/deleteDish/{dishId}":{
        delete:deleteDish
      },
      "/api/Comment/createComment":{
        post:createComment
      },
      "/api/Notify/getNotifyByAccountId":{
        get:notify
      },
      "/api/Image/UploadImage":{
        post: uploadImage
      }
    }

}