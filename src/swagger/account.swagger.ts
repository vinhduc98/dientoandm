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
                        sex:{
                            type:"number",
                            description:"1 là gái, 0 là trai"
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

export const changeAvatar:any={
    tags:["Account"],
    security: [
        {
          BearerAuth: [],
        },
    ],
    requestBody:{
        description: "Thay đổi avatar",
        require: true,
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        newAvatar:{
                            type:"string",
                            description:"url img muốn đổi"
                        },
                        oldAvatar:{
                            type:"string",
                            description:"url img cũ"
                        },
                    },
                },
                example:{
                    newAvatar:"imgUrl",
                    oldAvatar:"imgUrl",
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

export const updateAccount:any={
    tags:["Account"],
    security: [
        {
          BearerAuth: [],
        },
    ],
    requestBody:{
        description: "Update account, favorite",
        require: true,
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        name:{
                            type:"string",
                            description:"tên hiển thị"
                        },
                        favorites:{
                            type:"array",
                            description:"danh sách các id của dish"
                        },
                    },
                },
                example:{
                    name:"Nguyên đổ bóng nguyên con",
                    favorites:[1,14],
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

export const changePassword:any={
    tags:["Account"],
    security: [
        {
          BearerAuth: [],
        },
    ],
    requestBody:{
        description: "Đổi mật khẩu",
        require: true,
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        oldPwd:{
                            type:"string",
                            description:"Mật khẩu cũ"
                        },
                        newPwd:{
                            type:"string",
                            description:"Mật khẩu mới"
                        },
                    },
                },
                example:{
                    oldPwd:"",
                    newPwd:"",
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