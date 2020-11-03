import db from "../database/cookingrecipe";
import fs from "fs";

export const checkImgFile = (req:any,res:any, next:any) =>{
    let imgs = req.body.imgs;
    try {
        for(let i=0;i<imgs.length;i++)
        {
           let checkfs:any = fs.statSync("uploads/"+imgs[i]);
        }
    } catch (error) {
        return res.status(200).send({
            status:0,
            description:error.path + " không tồn tại ở phía server!!!",
        })
    }


    next();
}