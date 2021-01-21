import express from 'express';
import path from 'path';
import http from 'http';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import {swaggerDocument} from './swagger';
import { routes,routesNoauthenticate } from './routes';
import db from './database/cookingrecipe';
import morgan from "morgan";
import bodyParser from "body-parser";

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

db.sequelize
    .sync({ force: false, alter: true })
    .then(() => {
        console.log("Connecting database cookingrecipe");
    })
    .catch((err) => {
        console.log(err)
    })

let httpServer = new http.Server(app)

let io = require("socket.io")(httpServer,{
    cors:{
        origin:"http://localhost:3006",
        methods:["GET","POST"],
        credentials:true
    }
});

let ArrayUser: any =[];
io.on("connection",(socket:any)=>{
    console.log("connect:"+socket.id);
    socket.on('disconnect',()=>{
        console.log("disconnect:"+socket.id);
    })

    socket.on('online', (data:any) =>{
        if(data.username!==undefined)
        {
            ArrayUser.push(data);
            db.Account.update({
                state:'online'
            },{
                where:{
                    username:data.username
                }
            })
        }
    })

    socket.on('offline', (data:any)=>{
        if(data.username!==undefined)
        {
            // ArrayUser.splice(ArrayUser.indexOf(data),1);
            // console.log(ArrayUser);
            for(let i = 0;i< ArrayUser.length;i++)
            {
                if(data.username===ArrayUser[i].username)
                {
                    ArrayUser.splice(ArrayUser.indexOf(ArrayUser[i]),1)
                }
            }

            db.Account.update({
                state:'offline'
            },{
                where:{
                    username:data.username
                }
            })
        }
    })

    socket.on('send_messagelast_server',(data:any)=>{
        if(data)
        {
            io.to(data.socketId).emit('send_messagelast_client',data.messagelast);
        }
    })
    socket.on('send_messagelast_server',(data:any)=>{
        if(data)
        {
            db.Account.findOne({
                where:{
                    id:data.recipient
                }
            }).then(rs=>{
                for(let i=0;i<ArrayUser.length;i++)
                {
                    if(ArrayUser[i].username === rs.username)
                    {
                        io.to(ArrayUser[i].socketId).emit('send_messagelast_client', data.messagelast);
                        // io.to(ArrayUser[i].socketId).emit('notify_send_message',{username:rs.username, count:1})
                    }
                }
            })
        }
    })
})

routesNoauthenticate(app);
routes(app);
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});