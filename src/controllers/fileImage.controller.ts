import formidable from 'formidable';
import fs from 'fs'

export class FileImageController{
    uploadImage(req:any, res:any, next:any){
        // parse 1 file uploads
        let form = new formidable.IncomingForm();
        form.uploadDir ='./src/uploads';
        form.keepExtensions = true;
        // 10MB
        form.maxFieldsSize = 10*1024*1024;
        form.multiples= true;
        form.parse(req, (err:any, fields:any, files:any)=>{
            if(err){
                return res.status(200).send({
                    status:0,
                    description: `Cannot upload image : ${err}`
                })
            }
            let arrFile:any = [];
            let fileName:any;
            if(typeof(files.files)==='object')
            {
                if(files.files.length===undefined)
                {
                    fileName = files.files.path.split('\\')[2];
                    if(fileName.indexOf('.')<=-1)
                    {
                        fs.unlinkSync('./src/uploads/'+fileName);
                        arrFile =[];
                    }
                    else{
                        arrFile.push(fileName);
                    }
                }
                else{
                    for(let i=0;i<files.files.length;i++)
                    {
                        fileName=files.files[i].path.split('\\')[2]
                        arrFile.push(fileName);
                    }
                }
                console.log(arrFile);
            }

            return res.status(200).send({
                status:1,
                description:'Ok',
                data:arrFile
            })

        })
    }

    getImage(req:any, res:any, next:any){
        let imageName ="./src/uploads/"+req.query.imageName;
        fs.readFile(imageName, (err:any, imageData:any)=>{
            if(err){
                return res.status(200).send({
                    status:0,
                    description:'Failed to get the file'
                })
            }
            res.writeHead(200,{'Content-Type':'image/jpeg'});
            res.end(imageData);
        })

    }

    test(req:any, res:any, next:any){
        res.status(200).send('Ok');
    }


}