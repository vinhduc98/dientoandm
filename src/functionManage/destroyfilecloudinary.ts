// destroyed file
import {cloudinaryary} from '../config/server.config';
let cloudinary = require('cloudinary').v2;

export class FunctionHandle {
    async DestroyedFileImgOnCloudinary(filename:any){

        let rootfile:string = filename.split('/')[filename.split('/').length-1];
        let vitri:number =  rootfile.indexOf('.');
        rootfile = rootfile.slice(0,vitri);
        cloudinary.config(cloudinaryary)
        cloudinary.uploader.destroy(rootfile);
    }
}


