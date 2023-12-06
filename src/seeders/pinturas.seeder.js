const Pinturas = require("../models/pintura.model")

const insertMany = async () => {
    await Pinturas.deleteDataTable()
    const pintura1 =new Pinturas({
        titulo:"Pintura1",
        descripcion:"Esta es la pintura 1",
        id_usuario:9,
        imagen:"imagen",
        created_by:9,
        created_at: new Date(),
    })
    const pintura2 = new Pinturas({
        titulo:"Pintura2",
        descripcion:"Esta es la pintura 2",
        id_usuario:9,
        imagen:"imagen",
        created_by:9,
        created_at: new Date(),
    })
    const pintura3 = new Pinturas({
        titulo:"Pintura3",
        descripcion:"Esta es la pintura 3",
        id_usuario:9,
        imagen:"imagen",
        created_by:9,
        created_at: new Date(),
    })
    await pintura1.save()
    await pintura2.save()
    await pintura3.save()
    console.log("Pinturas creadas correctamente")
}
insertMany()