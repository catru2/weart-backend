const seguidoresController=require("../controllers/seguidores.controller");
const express=require("express");
const  verifyToken  = require("../middlewares/auth.middleware")

const router=express.Router()

router.get("/seguidos",verifyToken,seguidoresController.getAllSeguidos)
router.get("/seguidores",verifyToken,seguidoresController.getAllSeguidores)
router.get("/:id",verifyToken,seguidoresController.getById)
router.get("/contador/seguidores",verifyToken,seguidoresController.getCountSeguidores)
router.post("/:id", seguidoresController.crearseguidor)
router.delete("/:id",verifyToken,seguidoresController.delete)
router.patch("/:id",verifyToken,seguidoresController.updateId)
module.exports=router