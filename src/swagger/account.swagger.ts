export const createAccount:any={
    tags:["Account"],
    requestBody:{
        description: "Tạo mới 1 account",
        require: true,
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        username:{
                            type:"string",
                            description:"Tên tài khoản - là duy nhất, không được trùng"
                        },
                        pwd:{
                            type:"string",
                            description:"Mật khẩu"
                        },
                        name:{
                            type:"string",
                            description:"Tên người dùng"
                        },
                        type:{
                            type:"number",
                            description:"Loại 0 (admin) - loại 1 (user thường agent), mặc định tự tạo loại 1"
                        }
                    }
                },
                example:{
                    username:"agent5",
                    pwd:"123",
                    name:"Nguyên đổ bóng"
                }
            }
        }
    },
    responses:{
        "200":{
            description:"response",
            content:{
                "application/json":{
                    schema:{
                        type:"object"
                    },
                    example:{
                        status:1,
                        description:"Ok"
                    }
                }
            }
        }
    }
}

export const getAccountInfo:any={
    tags:["Account"],
    security: [
        {
          BearerAuth: [],
        },
    ],
    responses:{
        "200":{
            description:"response",
            content:{
                "application/json":{
                    schema:{
                        type:"object"
                    },
                    example:{
                        description:"Ok",
                        status: 1,
                        user:{
                            id: 7,
                            username:"admin",
                            name: "Rất thanh lịch",
                            avatar: "https://res.cloudinary.com/adsun/image/upload/v1601212865/wxnqvhz9ye89bqwaj7xg.png",
                            type:1,
                            favorites:[]
                        }
                    }
                }
            }
        }
    }
}