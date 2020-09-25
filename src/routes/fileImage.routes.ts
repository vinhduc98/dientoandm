import { Express } from 'express';
import {FileImageController} from '../controllers/fileImage.controller'

export function FileImageRoute(url:string, app:Express){
    const fileimage = new FileImageController();

    // app.route(`${url}/UploadImage`).post(fileimage.uploadImage);
    // app.route(`${url}/getImage`).get(fileimage.getImage);
    app.route(`${url}/UploadImage`).post(fileimage.uploadImage);
}