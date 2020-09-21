import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger";
import { routes } from "./routes";
import cors from "cors";

// import http from 'http';
import https from 'https';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "5mb" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.options("*", cors());


// let httpServer = new http.Server(app)
const httpsServer = https.createServer(app);

routes(app);

httpsServer.listen(8080, function() {
  console.log("listening on *:8080");
});



export { app};
