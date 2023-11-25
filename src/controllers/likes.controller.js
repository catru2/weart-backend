const Likes = require("../models/likes.model")
const jwt = require("jsonwebtoken")

const index = async (req, res) => {
    try {
        const lik = await Likes.getAll();
        return res.status(200).json({
            message: "Likes obtenidos correctamente",
            data: lik
        })
    } catch(error){
        return res.status(500).json({
            message: "Error al obtener likes",
            error: error.message
        })
    }
}

const createLike = async (req, res) =>{
    try{
        console.log(req.body)
        const decoded = {
            id:1
        };
        const like = new Likes ({
            id_pintura: req.params.id,
            created_by: decoded.id,
            created_at : new Date()
        })
        await like.save();
        return res.status(200).json({
            message: "Like dado correctamente",
            data: like
        })
    } catch(error){
        return res.status(500).json({
            message: "Error al dar like",
            error: error.message
        })
    }
}
const getById = async (req, res) =>{
    try {
        const {id} = req.params;
        const likes = await Likes.getById(id);
        if(!likes){
            return res.status(404).json({
                message: "No se encontro el id" + id,
            })
        }
        return res.status (200).json({
            message: "Like obtenido correctamente",
            data: likes
        })
    } catch (error) {
        return res.status(500).json({
            message:"Error al obtener el like",
            error: error.message
        })
    }
}
const deletseLogico = async (req,res) =>{
    try{
        const token=req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET_NAME)
        const pintura = {
            id_usuario: decoded.id,
            id_pintura: req.params.id
        }
        await Pintura.deleteById(pintura);
        return res.status(200).json({
            message:"pintura eliminada correctamente",
        })
    }catch(error){
        return res.status(500).json({
            message:"error al eliminar la pintura",
            error:error.message
        })
    }
}
const deleteLogico = async (req, res) => {
    try {
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET_NAME)
        const like = {
            id_pintura: decoded.id,
            id_likes: req.params.id
        }
        await Likes.deleteById(like);
        return res.status(200).json({
            message: "Like eliminado correctamente"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el like",
            error: error.message
        })
    }
}
const deleteFisico = async (req, res) => {
    try {
        const id_likes = req.params.id;
        await Likes.deleteFisicoById(id_likes);
        return res.status(200).json({
            message: "Like eliminado correctamente de forma definitiva"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar like",
            error: error.message
        })
    }
}
const update = async (req,res) =>{
    try {
        // const token = req.headers.token
        // const decoded = jwt.verify(token, process.env.SECRET_NAME
        const decoded = {
            id:1
        };
        const like = {
            id_pintura: req.params.id,
            updated_by: decoded.id
        }
        await Likes.updateById(like); 
        return res.status(200).json({
            message: "Se actualizo correctamente"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el like",
            error: error.message
        })
    }
}

module.exports={
    index,
    createLike,
    getById,
    delete: deleteLogico,
    update
}