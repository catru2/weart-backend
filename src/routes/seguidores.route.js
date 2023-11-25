const seguidoresController=require("../controllers/seguidores.controller");
const express=require("express");
const  verifyToken  = require("../middlewares/auth.middleware")

const router=express.Router()

router.get("/",verifyToken,seguidoresController.index)
router.get("/:id",verifyToken,seguidoresController.getById)
router.post("/:id", seguidoresController.crearseguidor)
router.delete("/:id",verifyToken,seguidoresController.delete)

module.exports=router