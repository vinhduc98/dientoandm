const express= require("express");

var PORT = process.env.PORT || 8080;
const app = express();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});