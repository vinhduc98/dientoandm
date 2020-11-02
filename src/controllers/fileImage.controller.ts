import fs from 'fs';
import db from '../database/cookingrecipe';
import {cloudinaryary} from '../config/server.config';
import {infoServer} from "../config/server.config"
let cloudinary = require('cloudinary').v2;

export class FileImageController{

    async uploadImage(req:any, res:any, next:any){

        let jwtPayLoad = req.jwtPayLoad;
        try {
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
                    if(err)
                    {
                        return res.status(200).send({
                            status:0,
                            description:'File upload error',
                            data:[]
                        })
                    }

                    arrSecureurl.push(result.secure_url);
                    await db.Img.create({
                        url_img:result.secure_url,
                        createUser: jwtPayLoad.username
                    })
                })
            }
            console.log(arrSecureurl);
            return res.status(200).send({
                status:1,
                description:'Ok',
                data:arrSecureurl
            })
        } catch (error) {
            return res.status(200).send({
                status:0,
                description:'Server error or unsuitable file format (requires .png, .jpg, ...)',
                data:[]
            })
        }
    }

    async uploadImageTest(req:any, res:any, next:any){
        try {
            let arrayFile:any =[];
            let files = req.files
            for(let i=0;i<files.length;i++)
            {
                let type = files[i].mimetype.split('/')[1].toLowerCase();
                if(type!=='png'&&type!=='jpg'&&type!=='jpeg')
                {
                    fs.unlinkSync(files[i].path)
                    return res.status(200).send({
                        status:0,
                        description:'Chúng tôi chỉ chấp nhận định dạng .png .jpg .jpeg'
                    })
                }
                else{
                    arrayFile.push(infoServer.HOST_NAME+"/api/Image/open_image/"+files[i].filename)
                }
            }
            return res.status(200).json({
                status:1,
                description:'Ok',
                data: arrayFile
            });
        } catch (error) {
            console.error(error);
        }
    }

    async openImage(req:any, res:any, next:any){
        let imageName = "uploads/"+req.params.image_name;
        fs.readFile(imageName,(err:any, imageData)=>{
            if(err){
                return res.status(200).send({
                    status:0,
                    description:`Không thể đọc file hình :${err}`
                })
            }
            res.writeHead(200, {'Content-Type':'image/jpeg'});
            res.end(imageData);
        })
    }
}