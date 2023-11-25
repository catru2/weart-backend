const likeController = require ("../controllers/likes.controller")
const express=require("express");
const verifyToken = require("../middlewares/auth.middleware");

const router=express.Router()

router.get("/", likeController.index)
router.get("/:id",verifyToken,likeController.getById)
router.post("/:id",verifyToken, likeController.createLike)
router.delete("/:id",verifyToken, likeController.delete)
router.put("/:id",verifyToken, likeController.update)

module.exports=router