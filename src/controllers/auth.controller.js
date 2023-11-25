const User = require("../models/user.model") 
const jwt = require ("jsonwebtoken")


const signIn = async(req,res)=>{
    console.log(req.body)
    const usuarioFound = await User.findUsername(req.body.correo)
    console.log(usuarioFound)
    if(!usuarioFound){
        return res.status(404).json({
            message:"usuario o password incorrectos"
        })
    }
    const matchPassword = await User.comparePassword(req.body.password,usuarioFound.contrasena)
    if(!matchPassword){
        return res.status(404).json({
            message:"usuario o password incorrectos"
        })
    }
    const token = jwt.sign({id:usuarioFound.id_usuario},process.env.SECRET_NAME,{
        expiresIn: 86400
    })
    return res.status(200).json({
        message:"sign in",
        token: token,
    })
}

module.exports = {
    signIn
}