const pinturaController=require("../controllers/pinturas.controller")
const  verifyToken  = require("../middlewares/auth.middleware")
const express=require("express");

const router=express.Router()

router.get("/" ,pinturaController.index)
router.get("/:id" ,pinturaController.getById)
router.post("/",verifyToken,pinturaController.createPintura)
router.delete("/:id",verifyToken,pinturaController.delete)
router.patch("/:id",verifyToken,pinturaController.update)
router.get("/usuario/:id",pinturaController.getAllByIdUsuario)
router.get("/random/get",pinturaController.getRandomPintura)
module.exports=router