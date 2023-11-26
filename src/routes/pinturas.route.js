const pinturaController=require("../controllers/pinturas.controller")
const  verifyToken  = require("../middlewares/auth.middleware")
const express=require("express");

const router=express.Router()

router.get("/" ,pinturaController.index)
router.get("/:id" ,verifyToken,pinturaController.getById)
router.post("/",verifyToken,pinturaController.createPintura)
router.delete("/:id",verifyToken,pinturaController.delete)
router.put("/:id",verifyToken,pinturaController.update)

module.exports=router