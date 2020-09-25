import formidable from 'formidable';
import fs from 'fs';
import {cloudinaryary} from '../config/server.config';
let cloudinary = require('cloudinary').v2;

export class FileImageController{

    async uploadImage(req:any, res:any, next:any){

        let arrFile:any=[];
        let arrSecureurl:any=[];

        cloudinary.config(cloudinaryary)

        const file = req.files.photo;
        if(typeof(file)==='object')
        {
            if(file.length===undefined)
            {
                arrFile.push(file)
            }
            else{
               arrFile=file;
            }

        }

        for(let i=0;i<arrFile.length;i++)
        {

            await cloudinary.uploader.upload(arrFile[i].tempFilePath,async (err:any, result:any)=>{
                arrSecureurl.push(result.secure_url);
            })
        }
        console.log(arrSecureurl);
        return res.status(200).send({
            status:1,
            description:'Ok',
            data:arrSecureurl
        })


    }

}