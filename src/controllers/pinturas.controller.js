const Pintura = require("../models/pintura.model") 
const jwt = require ("jsonwebtoken")
const bcrypt = require("bcrypt");
const fs=require("fs-extra")
const { uploadImage } = require("../configs/cloudinary.config")



const index = async (req, res) => {
    try{
        const usuarios = await Pintura.getAll();
        return res.status(200).json({
            message: "pinturas obtenidas correctamente",
            data: usuarios
        })
    }catch(error){
        return res.status(500).json({
        message: "error al obtener datos",
        error:error.message
        })
    }
}

const createPintura = async (req,res) =>{
    try{
        console.log(req.body)
        const token=req.headers.token
        const decoded= jwt.verify(token,process.env.SECRET_NAME)
        
        let imagen=null
        if(req.files?.imagen){
            imagen=await uploadImage(req.files.imagen.tempFilePath)
            await fs.unlink(req.files.imagen.tempFilePath)
        } 
        const pintura = new Pintura({
            id_usuario: decoded.id,
            titulo: req.body.titulo,
            descripcion:req.body.descripcion,
            imagen: imagen.secure_url,
            created_by:decoded.id,
            created_at: new Date()
        })
        await pintura.save();
        return res.status(200).json({
            message:"pintura creada correctamente",
            data:pintura
        })
    }catch(error){
        return res.status(500).json({
            message:"error al crear pintura",
            error:error.message
        })
    }
}
const getById = async(req,res)=>{
    try{
  const {id} = req.params;
  const pinturas=await Pintura.getById(id);
  if(!pinturas){
    return res.status(404).json({
        massage:"no se pudo encontrar al id" + id,
    })
  }
  return res.status(200).json({
    massage:"pintura obtenida correctamente",
    data:pinturas
  })
    }catch(error){
        return res.status(500).json({
            massage:"error al obtener la pintura ",
            error:error.message
          })
    }
}

const deleteLogico = async (req,res) =>{
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
const deleteFisico = async (req,res)=>{
    try{
        const id_pintura = req.params.id;
        await Pintura.deleteFisicoById(id_pintura);
        return res.status(200).json({
            message:"se elimino correctamente definitivamente"
        })
    }catch(error){
        return res.status(500).json({
            message:"error al eliminar la pintura",
            error: error.message
        })
    }
}
const update = async (req,res)=>{
    try{ 
        const token=req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET_NAME)
        console.log(req.body)
        let imagen=null

        if(req.files?.imagen){
            imagen=await uploadImage(req.files.imagen.tempFilePath)
            await fs.unlink(req.files.imagen.tempFilePath)
        } 
        const pintura = {
            id_usuario: decoded.id,
            titulo:req.body.titulo,
            descripcion:req.body.descripcion,
            imagen:imagen.secure_url  
        }
        await Pintura.updateById(req.params.id,pintura);
        return res.status(200).json({
            message:"se actualizo correctamente"
        })
    }catch(error){
        return res.status(500).json({
            message:"error al actualizar un usuario",
            error: error.message
        })
    
    }
}
  
module.exports={
    index,
    createPintura,
    getById,
    delete: deleteFisico,
    update
 
 }