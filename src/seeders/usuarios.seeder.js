require("dotenv").config()
const User = require("../models/user.model")

const insertMany = async () => {
    await User.deleteDataTable()
    const user1 =new User({
        nombre:"Juan",
        correo:"juan@gmail.com",
        contrasena: await User.encryptPassword("123456"),
        fecha_nacimiento:"1999-01-01",
        fecha_creacion: new Date(),
    })
    const user2 = new User({
        nombre:"Pedro",
        correo:"pedro@gmail.com",
        contrasena: await User.encryptPassword("123456"),
        fecha_nacimiento:"1999-01-01",
        fecha_creacion: new Date(),
    })
    const user3 = new User({
        nombre:"Maria",
        correo:"maria@gmail.com",
        contrasena: await User.encryptPassword("123456"),
        fecha_nacimiento:"1999-01-01",
        fecha_creacion: new Date(),
    })
    await user1.save()
    await user2.save()
    await user3.save()
    console.log("Usuarios creados correctamente")
}
insertMany()

