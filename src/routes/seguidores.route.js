const seguidoresController=require("../controllers/seguidores.controller");
const express=require("express");
const  verifyToken  = require("../middlewares/auth.middleware")

const router=express.Router()

router.get("/seguidores",verifyToken,seguidoresController.index)
router.get("/seguidores/:id",verifyToken,seguidoresController.getById)
router.post("/seguidores/:id", seguidoresController.crearseguidor)
router.delete("/seguidores/:id",verifyToken,seguidoresController.delete)

module.exports=router