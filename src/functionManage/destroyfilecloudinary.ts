// destroyed file
import {cloudinaryary} from '../config/server.config';
let cloudinary = require('cloudinary').v2;

export class FunctionHandle {
    async DestroyedFileImgOnCloudinary(filename:any){
        cloudinary.config(cloudinaryary)
        cloudinary.uploader.destroy(filename);
    }
}


