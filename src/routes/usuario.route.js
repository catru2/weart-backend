const usuarioController=require("../controllers/usuario.controller")
const express=require("express");
const  verifyToken  = require("../middlewares/auth.middleware")

const router=express.Router()



router.get("/" ,verifyToken,usuarioController.index)
router.get("/:id" ,verifyToken,usuarioController.getById)
router.post("/",usuarioController.createUser)
router.delete("/:id",verifyToken,usuarioController.delete)
router.put("/:id",verifyToken,usuarioController.update)


module.exports=router
