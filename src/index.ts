import express from 'express';
import path from 'path';
import http from 'http';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import {swaggerDocument} from './swagger';
import { routes } from './routes';


let PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "5mb" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.options("*", cors());


routes(app);
let httpServer = new http.Server(app)
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});