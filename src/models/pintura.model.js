const db= require("../configs/ConfiDB");
const bcrypt = require("bcrypt");
class Pintura{
    constructor({ id_pintura,id_usuario,titulo,descripcion, imagen,fecha_pintura,likes,created_by, created_at ,updated_by,updated_at,deleted_by,deleted_at,deleted }) {
        this.id_pintura=id_pintura;
        this.id_usuario = id_usuario;
        this.titulo=titulo;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.fecha_pintura= fecha_pintura;
        this.likes = likes;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_by= updated_by;
        this.updated_at= updated_at;
        this.deleted_by=deleted_by;
        this.deleted_at=deleted_at;
        this.deleted= deleted;
      }
      
      static async getAll() {
        const connection = await db.createConnection();
        const [rows] = await connection.query(
          "SELECT id_pintura,id_usuario,titulo,descripcion,imagen,fecha_pintura,likes,created_by, created_at ,updated_by,updated_at,deleted_by,deleted_at,deleted FROM pinturas WHERE deleted=0 ;"
        );
        connection.end();
        return rows;
      }


      static async getById(id) {
        const connection = await db.createConnection();
        const [rows] = await connection.query(
          "SELECT id_pintura,id_usuario,titulo,descripcion, url_imagen,fecha_pintura,likes,created_by, created_at ,updated_by,updated_at,deleted_by,deleted_at,deleted FROM pinturas WHERE id_pintura=? AND deleted=0 ;",
          [id]
        );
        connection.end();
        if (rows.length > 0) {
          const row = rows[0];
          return new Pintura({
            id_pintura: row.id_pintura,
            id_usuario: row.id_usuario,
            titulo: row.titulo,
            descripcion: row.descripcion,
            imagen: row.url_imagen,
            fecha_pintura: row.fecha_pintura,
            likes: row.likes,
            created_by: row.created_by,
            created_at: row.created_at,
            updated_by: row.updated_by,
            updated_at: row.updated_at,
            deleted_by:row.deleted_by,
            deleted_at: row.deleted_at,
            deleted: row.deleted
          });
        }
        return null;
      }

      async save() {
        const connection = await db.createConnection();
        const [result] = await connection.execute(
          "INSERT INTO pinturas(id_usuario,titulo,descripcion,imagen,created_by,created_at) VALUES (?,?,?,?,?,?)",
          [this.id_usuario,this.titulo,this.descripcion, this.imagen,this.created_by,this.created_at]
        );
        connection.end();
        if (result.insertId == 0) {
          throw new Error("no se pudo crear la pintura");
        }
        this.id = result.insertId;
      }
      
        static async deleteFisicoById(id) {
          const connection = await db.createConnection();
          const [result] = await connection.execute(
            "DELETE FROM pinturas WHERE id_pintura = ?",
            [id]
          );
          connection.end();
      
          if (result.affectedRows == 0) {
            throw new Error("no se pudo eliminar la pintura");
          }
      
          return;
        }

        static async deleteById(pintura) {
            const connection = await db.createConnection();
          
            const  deleted_at = new Date();
            const [result] = await connection.execute(
              "UPDATE pinturas SET deleted=true ,deleted_by=? ,deleted_at=? WHERE id_pintura=?",
              [ pintura.id_usuario,deleted_at,pintura.id_pintura]
            );
        
            connection.end();
        
            if (result.affectedRows == 0) {
              throw new Error("no se pudo eliminar la pintura");
            }
            return;
          }

          static async updateById(id_pintura,{titulo,descripcion,imagen,id_usuario}){
            const connection = await db.createConnection();
            const updateAt = new Date();
            
            const [result] = await connection.execute("UPDATE pinturas SET titulo=?,descripcion=?,imagen=?,updated_by =?,updated_at =? WHERE id_pintura=?",[titulo,descripcion,imagen,id_usuario,updateAt,id_pintura]);
          
            if(result.affectedRows == 0){
                throw new Error("no se pudo actualizar la pintura");
            }
             
            return
          }
      
}
module.exports = Pintura;