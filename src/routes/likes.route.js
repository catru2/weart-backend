const likeController = require ("../controllers/likes.controller")
const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");

const router=express.Router()

router.get("/pinturas/:id", likeController.index)
router.get("/:id",verifyToken,likeController.getById)
router.post("/:id",verifyToken, likeController.createLike)
router.delete("/:id",verifyToken, likeController.delete)
router.put("/:id",verifyToken, likeController.update)
router.get("/numero/:id", likeController.contadorLikes)
router.get("/getLikes/:id", likeController.getLikes)
module.exports=router