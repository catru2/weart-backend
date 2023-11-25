const Seguidores = require("../models/seguidores.model");
const jwt = require ("jsonwebtoken");

const index = async(req,res)=>{
    try{
      const seguidores= await Seguidores.getAll();
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
     const token=req.headers.token
     const decoded= jwt.verify(token,process.env.SECRET_NAME)
     console.log(decoded)
     const seguidores= new Seguidores({
        id_usuario: req.params.id,
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
     const token=req.headers.token
     const decoded= jwt.verify(token,process.env.SECRET_NAME)
     const seguidor={
        updated_by:decoded.id,
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
        const token=req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET_NAME)
        const seguidor={
            update_by:decoded.id,
            id_usuario:req.params.id
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
    index,
    crearseguidor,
    getById,
    delete:deleteLogico,

}