import { Express } from 'express';
import {FileImageController} from '../controllers/fileImage.controller'

export function FileImageRoute(url:string, app:Express){
    const fileImage = new FileImageController();
    app.route(`${url}/UploadImage`).post(fileImage.uploadImage);
}