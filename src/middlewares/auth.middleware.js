const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const verifyToken = (req, res, next) => {
    try{
        const token = req.headers.token
        
        if(!token){
            return res.status(403).json({
                message:"token no encontrado"
            })
        }
        
        const decoded = jwt.verify(token,process.env.SECRET_NAME)

        const correo = User.getById(decoded.id)

        
        if(!correo){
            return res.status(404).json({
                message:"usuario no encontrado"
            })
        }
        next() 
    }catch(error){
        return res.status(401).json({
            message:"unauthorized"
        })
    }
}

module.exports = verifyToken


// const {getTokendata}=require("../configs/jtt.config")
// const jwt=require("jsonwebtoken");
// const secretJwt = (process.env.SECRET_NAME);

// const verifyToken =async (req, res, next) => {
//     try{
//         // console.log(req.headers.authorization)
//         // const token = getTokendata(req.headers.authorization)
//         const token = req.headers["token"];
//         console.log(token)
//         if(token){
//             const auth = jwt.verify(token,secretJwt);
//             console.log(auth);
//             next()
//         }else{
//             return res.status(401).json({
//                 message:"unauthorized"
//             })
//         }
//     }catch(error){
//         return res.status(401).json({
//             message:"unauthorized"
//         })
//     }
// }
// module.exports ={verifyToken}