const likeController = require ("../controllers/likes.controller")
const express=require("express");
const verifyToken = require("../middlewares/auth.middleware");

const router=express.Router()

router.get("/likes", likeController.index)
router.get("/likes/:id",verifyToken,likeController.getById)
router.post("/likes/:id",verifyToken, likeController.createLike)
router.delete("/likes/:id",verifyToken, likeController.delete)
router.put("/pinturas/:id",verifyToken, likeController.update)

module.exports=router