const db= require("../configs/ConfiDB")


class Seguidores{
    constructor({id_seguido,id_usuario,created_by,fecha_seguido,updated_by,updated_at,deleted_by,deleted_at,deleted }){
             this.id_seguido=id_seguido;
             this.id_usuario=id_usuario;
             this.created_by=created_by;
             this.fecha_seguido=fecha_seguido;
             this.updated_by=updated_by;
             this.updated_at=updated_at;
             this.deleted_by=deleted_by;
             this.deleted_at=deleted_at;
             this.deleted=deleted;
    }
      static async getAll(){
        const connection=  await db.createConnection();
        const [rows] = await connection.query("SELECT id_seguido,id_usuario,fecha_seguido,created_by,updated_by,updated_at,deleted_by,deleted_at,deleted FROM seguidores WHERE deleted=0;"
        );
        connection.end();
        return rows;
      }

     static async getById(id){
       const connection = await db.createConnection();
       const [rows] = await connection.query("SELECT id_seguido,id_usuario,fecha_seguido,created_by,updated_by,updated_at,deleted_by,deleted_at,deleted FROM seguidores WHERE deleted=0;",
       [id]
       );
        connection.end();
        if(rows.length > 0){
        const row = rows[0];
        return new Seguidores({
            id_seguido: row.id_seguido,
            id_usuario: row.id_usuario,
            fecha_seguido: row.fecha_seguido,
            created_by: row.created_by,
            updated_by: row.updated_by,
            updated_at: row.updated_at,
            deleted_by:row.deleted_by,
            deleted_at: row.deleted_at,
            deleted: row.deleted
        })
        }
        return null;
     }

    async save(){
        const connection = await db.createConnection();
        const [result]= await connection.execute("INSERT INTO seguidores(id_usuario,created_by,fecha_seguido) VALUES(?,?,?)",
        [this.id_usuario,this.created_by,this.fecha_seguido]
        );
        connection.end();
        if(result.insertId==0){
           throw new Error("no se pudo crear al seguidor")

        }
        this.id = result.insertId;
    }
    static async deleteFisico(id){
       const connection = await db.createConnection();
       const [result]= await connection.execute("DELETE FROM seguidores WHERE id_seguido=?",[id]);
       connection.end();
       if (result.affectedRows == 0) {
        throw new Error("no se pudo eliminar al seguidor");
      }
      return;
    }
    static async deleteLogico(seguidor){
        const connection = await db.createConnection();
        const  deleted_at = new Date();
        console.log(seguidor)
        const [result]= await connection.execute("UPDATE seguidores SET deleted=true,deleted_by=?,deleted_at=? WHERE id_seguido=? ",
        [seguidor.deleted_by,deleted_at,seguidor.id_seguido]);
        connection.end();
        if (result.affectedRows == 0) {
            throw new Error("no se pudo eliminar la pintura");
          }
          return;
    }

   static async update(id_seguido,{id_usuario,updated_by}){
    const connection = await db.createConnection();
    const updated_at = new Date();
    const [result]= await connection.execute("UPDATE seguidores SET id_usuario=?, updated_by=?,updated_at=? WHERE id_seguido=?",
     [id_usuario,updated_by,updated_at,id_seguido]);
     connection.end();
     if(result.affectedRows==0){
      throw new Error("No se pudo actualizar al seguidor")
     }
     return;
   }
}
module.exports=Seguidores;