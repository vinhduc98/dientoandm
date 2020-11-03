import { response } from "express"

export const getAlldish:any={
    tags:["Dish"],
    description:"Lấy thông tin tất cả các dish",
    responses:{
        "200":{
            description:"Danh sách dish này cả người ngoài và user đều có thể xem",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                    },
                    example:{
                        status: 1,
                        description:"Ok",
                        dishes:[
                            {
                                id:"id",
                                name:"tên dish",
                                label:"New",
                                description:"description của dish",
                                featured: "Kiểu bool, nêu true sẽ đưa lên đầu trang",
                                category:"Loại dish",
                                price:"Giá",
                                commentState:1,
                                accountId:"tên account post dish lên",
                                imgs:["img_name","img_name1"]
                            }
                        ]
                    }
                }
            }
        }
    }
}

export const createDish:any={
    tags:["Dish"],
    security: [
        {
          BearerAuth: [],
        },
    ],
    requestBody:{
        description: "Tạo mới 1 Dish",
        require:true,
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        name:{
                            type:"string",
                            description:"Tên của dish"
                        },
                        label:{
                            type:"string",
                            description:"nhãn dán gì gì đó - mặc định là chuỗi rỗng ('') "
                        },
                        featured:{
                            type:"boolean",
                            description: "feature = true thì sẽ được đưa lên trang đầu"
                        },
                        category:{
                            type:"string",
                            description:"Loại dish - mặc định là chuỗi rỗng ('')"
                        },
                        price:{
                            type:"double",
                            description:"Giá - mặc đinh là 0"
                        },
                        description:{
                            type:"string",
                            description:"chú thích gì gì đó"
                        },
                        imgs:{
                            type:"arr",
                            description:"danh sách hình để post lên - không có hình thì để rỗng"
                        },
                        commentState:{
                            type:"int",
                            description:"Trạng thái thiết kế giao diện - default = 1," +
                            "0 (không cho cmt),"+
                            "1(cmt tùy ý 1 là dùng tài khoản clone, 2 là đăng nhập mới được cmt),"+
                            "2(chỉ cho đăng nhập mới được cmt)"
                        }
                    },
                },
                example:{
                    name:"Bánh canh cua",
                    label:"Hot",
                    featured:false,
                    category:"mains",
                    price:4.3,
                    description:"Món ăn mém ngon",
                    imgs:[]
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
                        type:"object",
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

export const updateDish:any={
    tags:["Dish"],
    security: [
        {
            BearerAuth: [],
        },
    ],
    parameters: [
        {
            in: "path",
            name: "dishId",
            require: true,
            schema: {
                type: "int",
            },
            description: "update 1 dish",
        },
    ],
    requestBody:{
        description: "update 1 Dish",
        require:true,
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        name:{
                            type:"string",
                            description:"Trường này có hoặc không đều được"
                        },
                        label:{
                            type:"string",
                            description:"Trường này có hoặc không đều được"
                        },
                        featured:{
                            type:"boolean",
                            description: "Trường này có hoặc không đều được"
                        },
                        category:{
                            type:"string",
                            description:"Trường này có hoặc không đều được"
                        },
                        price:{
                            type:"double",
                            description:"Trường này có hoặc không đều được"
                        },
                        description:{
                            type:"string",
                            description:"Trường này có hoặc không đều được"
                        },
                        imgs:{
                            type:"array",
                            description:"Trường này có hoặc không đều được"
                        },
                    },
                },
                example:{
                    name:"Bánh canh cua",
                    label:"Hot",
                    featured:false,
                    category:"mains",
                    price:4.3,
                    description:"Món ăn mém ngon",
                    img:[],
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
                        type:"object",
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

export const deleteDish:any={
    tags:["Dish"],
    security: [
        {
            BearerAuth: [],
        },
    ],
    parameters: [
        {
            in: "path",
            name: "dishId",
            require: true,
            schema: {
                type: "int",
            },
            description: "update 1 dish",
        },
    ],
    responses:{
        "200":{
            description:"response",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
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