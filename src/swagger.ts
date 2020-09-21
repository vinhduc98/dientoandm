export const swaggerDocument ={
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Doc API",
      description: "",
      termsOfService: "",
      contact: {
        name: "",
        email: "",
        url: "",
      },
    },
    components: {
      schemas: {},
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },


}