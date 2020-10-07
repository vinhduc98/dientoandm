import express from 'express';
import path from 'path';
import http from 'http';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import {swaggerDocument} from './swagger';
import Sequelize from 'sequelize';
import { routes,routesNoauthenticate } from './routes';
import db from './database/cookingrecipe';
import fileupload from 'express-fileupload';
import fs from 'fs';
import {img} from './config/defaultimg.config'
import { FunctionHandle } from './functionManage/destroyfilecloudinary';



let PORT = process.env.PORT || 8080;

const app = express();

app.use(fileupload({
    useTempFiles:true
}))


app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "5mb" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.options("*", cors());

db.sequelize
    .sync ({force:false, alter: true})
    .then(()=>{
        console.log("Connecting database cookingrecipe");
        db.Img.findOne({where:{
            url_img:img.iconlogin
        }}).then(rs=>{
            if(rs===null)
            {
                db.Img.create({
                    url_img:img.iconlogin
                })
            }
        })
    })
    .catch((err)=>{
        console.log(err)
    })

routesNoauthenticate(app);
routes(app);

let httpServer = new http.Server(app)
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});