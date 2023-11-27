const usuarioController=require("../controllers/usuario.controller")
const express=require("express");
const  verifyToken  = require("../middlewares/auth.middleware")

const router=express.Router()



router.get("/" ,usuarioController.index)
router.get("/:id" ,usuarioController.getById)
router.post("/",usuarioController.createUser)
router.delete("/:id",verifyToken,usuarioController.delete)
router.put("/:id",verifyToken,usuarioController.update)
router.patch("/",verifyToken,usuarioController.updateDescription)
router.get("/get/by/token",usuarioController.getBytoken)
module.exports=router
