require("dotenv").config()
require("./configs/ConfiDB")
const express = require("express");
const app= express();
const fileUpload = require('express-fileupload');
const PORT= process.env.PORT
const cors = require('cors')

const userRoute=require("./routes/usuario.route")
const pinturaRoute=require("./routes/pinturas.route")
const seguidoresRoute=require("./routes/seguidores.route")
const authRoutes= require("./routes/auth.route")
const likesRoutes = require('./routes/likes.route')
app.use(cors())
app.use(express.json())

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./pintura_imagen",
}));

app.use(express.urlencoded({extended:false}))

    app.use("/api",userRoute,authRoutes,pinturaRoute,seguidoresRoute,likesRoutes)






app.listen(PORT,() => {
console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});