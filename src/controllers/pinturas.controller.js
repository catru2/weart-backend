const Pintura = require("../models/pintura.model") 
const jwt = require ("jsonwebtoken")
const fs=require("fs-extra")
const { uploadImage } = require("../configs/cloudinary.config")

const index = async (req, res) => {
    try{
        const limit= parseInt(req.query.limit)
        const page = parseInt(req.query.page)
        const offset = (page - 1) * limit
        const {sort,order} = req.query

        const usuarios = await Pintura.getAll({limit,offset},{sort,order});

        let response = {
            message: "pinturas obtenidas correctamente",
            data: usuarios
        }
        if(page && limit){
            const totalPinturas = await Pintura.count()
            response = {
                ...response,
                total:  totalPinturas,
                totalPages: Math.ceil(totalPinturas / limit),
                currentPage: page,
            }
        }
        
        return res.status(200).json(response)
    }catch(error){
        return res.status(500).json({
        message: "error al obtener datos",
        error:error.message
        })
    }
}
const getAllByIdUsuario = async (req,res)=>{
    try{
        const {id} = req.params;
        const pinturas = await Pintura.getAllByIdUsuario(id);
        return res.status(200).json({
            message:"pinturas obtenidas correctamente",
            data:pinturas
        })
    }catch(error){
        return res.status(500).json({
            message:"error al obtener mis pinturas",
            error:error.message
        })
    }
}
const getRandomPintura = async (req,res) => {
    try{
        const limit= parseInt(req.query.limit)
        const page = parseInt(req.query.page)
        const offset = (page - 1) * limit
        const {sort,order} = req.query

        const numeroPinturas = await Pintura.count()
        const pinturas = await Pintura.getAll({limit,offset},{sort,order});
        const newPinturas = []
        let num = []
        let i = 0
        num[i] = Math.floor(Math.random() * numeroPinturas)
        for (let i = 0; i < numeroPinturas; i++) {
            num[i] = Math.floor(Math.random() * numeroPinturas);
            for (let k = 0; k < i; k++) {
                if(num[i] == num[k]){
                    i--
                }
            }
        } 
        for (let l = 0; l < num.length; l++) {
            newPinturas[l] = pinturas[num[l]]
        }


        let response = {
            message: "pinturas randoms correctamente",
            data: newPinturas
        }
        if(page && limit){
            response = {
                ...response,
                total:  numeroPinturas,
                totalPages: Math.ceil(numeroPinturas / limit),
                currentPage: page,
            }
        }
        
        return res.status(200).json(response)
    }catch(error){
        return res.status(500).json({
            message:"no se pudo generar pinturas randoms"
        })
    }
}

const createPintura = async (req,res) =>{
    try{
        const token=req.cookies.token
        console.log(token)
        const decoded = Pintura.obtenerIdToken(token)
        
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
  const pinturas = await Pintura.getById(id);
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
        const token=req.cookies.token
        const decoded = Pintura.obtenerIdToken(token)
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
        const token=req.cookies.token
        const decoded = Pintura.obtenerIdToken(token)
        const pintura = {
            id_usuario: decoded.id,
            titulo:req.body.titulo,
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
    delete: deleteLogico,
    update,
    getAllByIdUsuario,
    getRandomPintura,
 }