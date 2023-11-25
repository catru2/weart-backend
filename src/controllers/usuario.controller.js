require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { request } = require("express");
const saltos = process.env.SALTOS;

//1
const index = async (req, res) => {
    try{
        const usuarios = await User.getAll();
        return res.status(200).json({
            message: "usuarios obtenidos correctamente",
            data: usuarios
        })
    }catch(error){
        return res.status(500).json({
        message: "error al obtener datos",
        error:error.message
        })
    }
}

//2
const createUser = async (req,res) =>{
    try{
        console.log(req.body)
        const usuario = new User({
            nombre: req.body.nombre,
            correo:req.body.correo,
            contrasena: bcrypt.hashSync(req.body.password,parseInt(saltos)),
            fecha_nacimiento:req.body.fecha_nacimiento,
            fecha_creacion: new Date()
        })
        await usuario.save();
        return res.status(200).json({
            message:"usuario creado correctamente",
            data:usuario,
            succesn:true
        })
    }catch(error){
        return res.status(500).json({
            message:"error al crear usuario",
            error:error.message,
            succesn:false
        })
    }
}


const getById = async (req,res) =>{
    try{
        const {id} = req.params;
        const usuario = await User.getById(id);
        if(!usuario){
            return res.status(404).json({
                message:"usuario no encontrado con el id "+id,
            })
        }
        return res.status(200).json({
            message:"usuario obtenido correctamente",
            data:usuario
        })
    }catch(error){
        return res.status(500).json({
            message:"error al obtener un usuario",
            error:error.message
        })
    }
}
const deleteLogico = async (req,res) =>{
    try{
        const  idUsuario = req.params.id;
        await User.deleteById(idUsuario);
        return res.status(200).json({
            message:"usuario eliminado correctamente",
        })
    }catch(error){
        return res.status(500).json({
            message:"error al eliminar un usuario",
            error:error.message
        })
    }
}

const deleteFisico = async (req,res)=>{
    try{
        const idUsuario = req.params.id;
        await User.deleteFisicoById(idUsuario);
        return res.status(200).json({
            message:"se elimino definitivamente correctamente"
        })
    }catch(error){
        return res.status(500).json({
            message:"erro al eliminar un usuario",
            error: error.message
        })
    }
}
  
  const update = async (req,res)=>{
    try{
        const idUsuario = req.params.id;
        await User.updateById(idUsuario,req.body);
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
   createUser,
   getById,
   delete: deleteLogico,
   update,

}