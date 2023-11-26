const Seguidores = require("../models/seguidores.model");
const jwt = require ("jsonwebtoken");

const getAllSeguidos = async(req,res)=>{
    try{
        const token=req.cookies.token
        const decoded = Seguidores.obtenerIdToken(token)
      const seguidores= await Seguidores.getAll(decoded.id);
      return res.status(200).json({
        message:("se obtuvo a todos los seguidores correcatmanete "),
        data:seguidores
      })
    }catch(error){
       return res.status(500).json({
        message:("No se pudo obtener a los seguidores"),
        error:error.message
       })
    }
}
const getAllSeguidores = async (req,res)=>{
    try{
        const token= req.cookies.token
        const decoded = Seguidores.obtenerIdToken(token)
        const seguidores = await Seguidores.getSeguidores(decoded.id);
        return res.status(200).json({
            message:"seguidores obtenidos correctamente",
            data:seguidores
        })
    }catch(error){
        return res.status(500).json({
            message:"no se pudo obtener a los seguidores",
            error:error.message
        })
    }
}
const getCountSeguidores = async (req,res)=>{
    try{
        const token= req.cookies.token
        const decoded = Seguidores.obtenerIdToken(token)
        const seguidores = await Seguidores.getCountSeguidores(decoded.id);
        return res.status(200).json({
            message:"seguidores obtenidos correctamente",
            data:seguidores
        })
    }catch(error){
        return res.status(500).json({
            message:"no se pudo obtener a los seguidores",
            error:error.message
        })
    }
}

const getById = async (req,res)=>{
    try{
        const {id} = req.params;
        const seguidores=await Seguidores.getById(id);
        if(!seguidores){
          return res.status(404).json({
              massage:"no se pudo encontrar al id" + id,
          })
        }
        return res.status(200).json({
            massage:"seguidor obtenido correctamente",
            data:seguidores
          })
    }catch(error){
        return res.status(500).json({
            message:("No se pudo obtener al seguidor"),
            error:error.message
           })
    }
}


const crearseguidor = async (req,res)=>{
    try{
     const token=req.cookies.token
     const decoded = await Seguidores.obtenerIdToken(token)
     console.log(decoded)
     const seguidores= new Seguidores({
        id_seguido: req.params.id,
        id_usuario:decoded.id,
        created_by:decoded.id,
        fecha_seguido: new Date()
     })
      await seguidores.save();
      return res.status(200).json({
        message:("El seguidor se creo correcatmanete "),
        data:seguidores
      })
     }catch (error){
        return res.status(500).json({
            message:("No se pudo crear al seguidor"),
            error:error.message
           })
    }
}

const deleteFisico = async (req,res) =>{
    try{
        const id_seguido = req.params.id;
        await Seguidores.deleteFisico(id_seguido);
        return res.status(200).json({
            message:"seguidor eliminado correctamente",
        })
    }catch(error){
        return res.status(500).json({
            message:"error al eliminar al seguidor",
            error:error.message
        })
    }
}

const updateId = async (req,res)=>{
    try{
     const token=req.cookies.token
     const decoded= Seguidores.obtenerIdToken(token)
     const seguidor = {
        updated_by:decoded.id,
        id_usuario:decoded.id,
        id_seguido:req.params.id
     }
     await Seguidores.update(seguidor)
     return res.status(200).json({
        message:"seguidor actualizado correctamente"
     })
    }catch(error){
        return res.status(500).json({
            message:"error al actualizar al seguidor",
            error:error.message
        })
    }
}

const deleteLogico = async (req,res)=>{
    try{
        const token=req.cookies.token
        const decoded = Seguidores.obtenerIdToken(token)
        const seguidor={
            deleted_by:decoded.id,
            id_usuario:decoded.id,
            id_seguido:req.params.id
        }
        await Seguidores.deleteLogico(seguidor)
        return res.status(200).json({
            message:"seguidor eliminado correctamente",
        })
    }catch(error){
        return res.status(500).json({
            message:"error al eliminar al seguidor",
            error:error.message
        })
    }
    
}



module.exports={
    getAllSeguidos,
    getAllSeguidores,
    crearseguidor,
    getById,
    delete:deleteLogico,
    getCountSeguidores,
    updateId
}