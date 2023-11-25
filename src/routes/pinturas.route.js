const pinturaController=require("../controllers/pinturas.controller")
const  verifyToken  = require("../middlewares/auth.middleware")
const express=require("express");

const router=express.Router()

router.get("/pinturas" ,pinturaController.index)
router.get("/pinturas/:id" ,verifyToken,pinturaController.getById)
router.post("/pinturas",verifyToken,pinturaController.createPintura)
router.delete("/pinturas/:id",verifyToken,pinturaController.delete)
router.put("/pinturas/:id",verifyToken,pinturaController.update)

module.exports=router