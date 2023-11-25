const db= require("../configs/ConfiDB");
const bcrypt = require("bcrypt");
const saltos = parseInt(process.env.SALTOS_BCRYPT);
class User{
  constructor({ id_usuario,nombre, correo, contrasena,fecha_nacimiento,biografia,fecha_creacion, fecha_actualizacion,eliminado,fecha_eliminado }) {
    this.id_usuario = id_usuario;
    this.nombre=nombre;
    this.correo = correo;
    this.contrasena = contrasena;
    this.fecha_nacimiento = fecha_nacimiento;
    this.biografia= biografia;
    this.fecha_creacion = fecha_creacion;
    this.fecha_actualizacion = fecha_actualizacion;
    this.eliminado = eliminado;
    this.fecha_eliminado= fecha_eliminado;
  }
//1
static async getAll() {
  const connection = await db.createConnection();
  const [rows] = await connection.query(
    "SELECT id_usuario,nombre,correo,contrasena,fecha_nacimiento,fecha_creacion,fecha_actualizacion,eliminado,fecha_eliminado FROM usuarios WHERE eliminado=0 ;"
  );
  connection.end();
  return rows;
}
//2
static async getById(id) {
  const connection = await db.createConnection();
  const [rows] = await connection.query(
    "SELECT id_usuario,nombre,correo,contrasena,fecha_nacimiento,fecha_creacion,fecha_actualizacion,eliminado,fecha_eliminado FROM usuarios WHERE id_usuario=? AND eliminado=0 ;",
    [id]
  );
  connection.end();
  if (rows.length > 0) {
    const row = rows[0];
    return new User({
      id_usuario: row.id_usuario,
      correo: row.correo,
      contrasena: row.contrasena,
      fecha_nacimiento: row.fecha_nacimiento,
      fecha_creacion: row.fecha_creacion,
      fecha_actualizacion: row.fecha_actualizacion,
      eliminado: row.eliminado,
      fecha_eliminado: row.fecha_eliminado,
    });
  }
  return null;
}


//3
async save() {
  const connection = await db.createConnection();
  const [result] = await connection.execute(
    "INSERT INTO usuarios(nombre,correo,contrasena,fecha_nacimiento,fecha_creacion) VALUES (?,?,?,?,?)",
    [this.nombre,this.correo, this.contrasena,this.fecha_nacimiento,this.fecha_creacion]
  );
  connection.end();
  if (result.insertId == 0) {
    throw new Error("no se pudo crear el usuario");
  }
  this.id = result.insertId;
}

  static async deleteFisicoById(id) {
    const connection = await db.createConnection();
    const [result] = await connection.execute(
      "DELETE FROM usuarios WHERE id_usuario = ?",
      [id]
    );
    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se pudo eliminar el usuario");
    }

    return;
  }

  //4
  static async deleteById(id_usuario) {
    const connection = await db.createConnection();

    const fecha_eliminado = new Date();
    const [result] = await connection.execute(
      "UPDATE usuarios SET eliminado=true ,fecha_eliminado=? WHERE id_usuario=?",
      [fecha_eliminado, id_usuario]
    );

    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se pudo eliminar el usuario");
    }
    return;
  }

static async updateById(id_usuario,{nombre,correo,contrasena}){
  const connection = await db.createConnection();
  const updateAt = new Date();
  let password=contrasena;
  if(contrasena){
    password=bcrypt.hashSync(contrasena,saltos)
  }
  const [result] = await connection.execute("UPDATE usuarios SET nombre=?,correo=?,contrasena=?,fecha_actualizacion=? WHERE id_usuario=?",[nombre,correo,password,updateAt,id_usuario]);

  if(result.affectedRows == 0){
      throw new Error("no se pudo actualizar el usuario");
  }
   
  return
}

static async findUsername(correo) {
  const connection = await db.createConnection();

  const [result] = await connection.execute(
    "SELECT id_usuario,correo,contrasena FROM usuarios WHERE correo=?",
    [correo]
  );

  connection.end();

  if (result.affectedRows == 0) {
    throw new Error("no se pudo encontrar al usuario");
  }
  return result[0];
}

static async encryptPassword(password){
  const salt = await bcrypt.genSalt(saltos)
  return await bcrypt.hash(password,salt)
}
static async comparePassword(password,receivedPassword){
  return await bcrypt.compare(password,receivedPassword)
} 

}
module.exports = User;