export const notify:any={
    tags:["Notify"],
    security: [
        {
          BearerAuth: [],
        },
    ],
    responses:{
        "200":{
            description:"Danh sách thông báo",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                    },
                    example:{
                        status: 1,
                        description:"Ok",
                        notifies:[
                            {
                                id: 3,
                                content: "agent2 đã bình luận vào 1 dish của bạn",
                                state: 1,
                                createdAt: "2020-10-09T04:26:43.000Z",
                                updatedAt: "2020-10-09T04:26:43.000Z",
                                accountId: 2
                            }
                        ]
                    }
                }
            }
        }
    }
}