const Likes = require("../models/likes.model")
const jwt = require("jsonwebtoken")

const index = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const {sort,order} = req.query;
        const offset = (page - 1) * limit;

        const likes = await Likes.getAll(req.params.id,{limit,offset},{sort,order});

        let response ={
            message: "Likes obtenidos correctamente",
            data: likes
        }
        if(page && limit){
            const totalLikes = await Likes.count(req.params.id);
            response = {
                ...response,
                total:  totalLikes,
                totalPages: Math.ceil(totalLikes / limit),
                currentPage: page,
            }
        }
        return res.status(200).json(response)
    } catch(error){
        return res.status(500).json({
            message: "Error al obtener likes",
            error: error.message
        })
    }
}
const contadorLikes = async (req, res) => {
    try {
        const totalLikes = await Likes.count(req.params.id);
        return res.status(200).json({
            message: "Likes obtenidos correctamente",
            data: totalLikes
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
        const token = req.cookies.token
        const decoded = await Likes.getTokenid(token)
        const like = new Likes ({
            id_pintura: req.params.id,
            id_usuario: decoded.id,
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


const deleteLogico = async (req, res) => {
    try {
        const token = req.cookies.token
        const decoded = await Likes.getTokenid(token)
        const like = {
            id_pintura: req.params.id,
            id_usuario: decoded.id,
            deleted_by: decoded.id,
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
        const token = req.cookies.token
        const decoded = await Likes.getTokenid(token)
        const like = {
            id_pintura: req.params.id,
            id_usuario: decoded.id,
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
const getLikes = async (req,res) => {
    try{
        const token = req.cookies.token
        const decoded = await Likes.getTokenid(token)
        const like ={
            id_pintura: req.params.id,
            id_usuario: decoded.id
        }
        const likes = await Likes.getLikes(like);
        return res.status(200).json({
            message: "Likes obtenidos correctamente",
            data: likes
        })
    }catch(error){
        return res.status(500).json({
            message: "Error al obtener likes",
            error: error.message
        })
    }
}



module.exports={
    index,
    createLike,
    getById,
    delete: deleteLogico,
    update,
    contadorLikes,
    getLikes
}