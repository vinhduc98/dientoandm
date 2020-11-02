import { Express } from 'express';
import {FileImageController} from '../controllers/fileImage.controller';
import path from "path"
const multer = require('multer');

export function FileImageRoute(url:string, app:Express){
    const fileImage = new FileImageController();
    app.route(`${url}/UploadImage`).post(fileImage.uploadImage);


    const storage = multer.diskStorage({
        destination: (req:any, file:any, cb:any) => {
            cb(null, path.join(__dirname, '/uploads/'));
        },
        filename: (req:any, file:any, cb:any) => {
            console.log(file);
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage, limits: {
        fileSize: 1024 * 1024 * 5
      } });
    app.route(`${url}/UploadImageTest`).post(upload.array('image'),fileImage.uploadImageTest);

}

export function FileInageRouteNoauthenticate(url:string, app:Express){
    const fileImage = new FileImageController();
    app.route(`${url}/open_image/:image_name`).get(fileImage.openImage);
}