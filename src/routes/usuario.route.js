const usuarioController=require("../controllers/usuario.controller")
const express=require("express");
const  verifyToken  = require("../middlewares/auth.middleware")

const router=express.Router()



router.get("/usuarios" ,verifyToken,usuarioController.index)
router.get("/usuarios/:id" ,verifyToken,usuarioController.getById)
router.post("/usuarios",usuarioController.createUser)
router.delete("/usuarios/:id",verifyToken,usuarioController.delete)
router.put("/usuarios/:id",verifyToken,usuarioController.update)


module.exports=router
