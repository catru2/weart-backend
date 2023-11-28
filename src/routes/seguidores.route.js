const seguidoresController=require("../controllers/seguidores.controller");
const express=require("express");
const  verifyToken  = require("../middlewares/auth.middleware")

const router=express.Router()

router.get("/seguidos",seguidoresController.getAllSeguidos)
router.get("/seguidores",seguidoresController.getAllSeguidores)
router.get("/:id",seguidoresController.getById)
router.get("/contador/seguidores",verifyToken,seguidoresController.getCountSeguidores)
router.get("/bandera/:id",seguidoresController.getBooleanSeguidor)
router.post("/:id",verifyToken, seguidoresController.crearseguidor)
router.delete("/:id",verifyToken,seguidoresController.delete)
router.patch("/:id",verifyToken,seguidoresController.updateId)
module.exports=router