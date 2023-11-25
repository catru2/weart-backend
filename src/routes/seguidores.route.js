const seguidoresController=require("../controllers/seguidores.controller");
const express=require("express");
const  verifyToken  = require("../middlewares/auth.middleware")

const router=express.Router()

router.get("/seguidos",verifyToken,seguidoresController.getAllSeguidos)
router.get("/seguidores",verifyToken,seguidoresController.getAllSeguidores)
router.get("/:id",verifyToken,seguidoresController.getById)
router.post("/:id", seguidoresController.crearseguidor)
router.delete("/:id",verifyToken,seguidoresController.delete)
router.get("/contador/seguidores",verifyToken,seguidoresController.getCountSeguidores)
module.exports=router