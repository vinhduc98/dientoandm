import express from 'express';
import http from 'http';


let PORT = process.env.PORT || 8080;

const app = express();
let httpServer = new http.Server(app)
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});