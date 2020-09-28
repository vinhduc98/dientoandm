
let tableNameoferror =function  checkBelongtoDatabase(err:any, req:any, res:any){
    let message;
    if(err.name==="SequelizeUniqueConstraintError")
    {
        if(err.errors[0].message.indexOf("accounts")!==-1)
        {
            message = "Tài khoản";
        }
    }
    if(err.name==="SequelizeForeignKeyConstraintError")
    {
        if(err.parent.sqlMessage.indexOf("accountId")!==-1)
        {
            message =`Người dùng`;
        }
        if(err.parent.sqlMessage.indexOf("dishId")!==-1)
        {
            message =`Thực đơn`;
        }
    }
    return message;
}

export const ErrorGeneral = async (err:any,status:number ,req:any, res:any, next:any)=>{
    if(err.name===null || err.name===""||err.name===undefined)
    {
        return res.status(status).send(
            {
                status:0,
                description:"Lỗi xảy ra do quá trình thao tác dữ liệu",
            });
    }
    else{
        if(err.name==="SequelizeUniqueConstraintError"){
            let listValue;
            for(let i = 0;i<err.errors.length;i++)
            {
                listValue = err.errors[i].value;

            }
            return res.status(status).send(
                {
                    status:0,
                    description:`${tableNameoferror(err,req,res)} ${listValue} hiện tại đã tồn tại!`,
                });
        }
        if(err.name==="SequelizeDatabaseError"){
            return res.status(status).send(
                {
                    status:0,
                    description:"Dữ liệu hiện tại bị lỗi"
                });
        }

        if(err.name==="SequelizeTimeoutError"){
            return res.status(status).send(
                {
                    status:0,
                    description:"Hết thời gian thao tác"
                });
        }

        if(err.name==="SequelizeForeignKeyConstraintError")
        {
            return res.status(status).send(
                {
                    status:0,
                    description:`${tableNameoferror(err,req,res)} vừa lựa chọn không tồn tại`,

                });
        }
        if(err.name==="SequelizeValidationError")
        {
            return res.status(status).send(
                {
                    status:0,
                    description:`Lỗi website do quá trình thao tác dữ liệu`,

                });
        }
        else{
            return res.status(status).send(
                {
                    status:0,
                    description:`Lỗi server`,
                });
        }
    }
}