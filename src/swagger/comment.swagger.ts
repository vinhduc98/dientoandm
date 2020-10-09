export const createComment = {
    tags:["Comment"],
    requestBody:{
        description: "Comment",
        require: true,
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        rating:{
                            type:"double",
                            description:"sao"
                        },
                        comment:{
                            type:"string",
                            description:"Nội dung comment"
                        },
                        author:{
                            type:"string",
                            description:"Người comment, có thể là ẩn danh hoặc thành viên"
                        },
                        dishId:{
                            type:"int",
                            description:"Dish để comment"
                        }
                    }
                },
                example:{
                    rating:3.5,
                    comment:"Nhìn z mà ngon gì chời, dở ẹt, thằng Nguyên bê đê còn ngon hơn thằng Nguyên bóng",
                    author:"agent1",
                    dishId:1
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