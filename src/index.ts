import express from 'express';
import path from 'path';
import http from 'http';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import {swaggerDocument} from './swagger';
import { routes,routesNoauthenticate } from './routes';
import db from './database/cookingrecipe';
import morgan from "morgan";
import cache from 'memory-cache';
import bodyParser from "body-parser";
import fs from "fs";
import axios from "axios";
import https from 'https'

let PORT = process.env.PORT || 8000;

const app = express();

// app.use(fileupload({
//     useTempFiles:true
// }))
// app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.options("*", cors());

// const httpsAgent = new https.Agent({ rejectUnauthorized: false });
// axios.get("https://image.ap-south-1.linodeobjects.com/abc.jpg",{httpsAgent}).then(rs=>{
//     console.log(rs);
// })

db.sequelize
    .sync ({force:false, alter: true})
    .then(()=>{
        console.log("Connecting database cookingrecipe");
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