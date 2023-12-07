require("dotenv").config();
const db = require("../configs/ConfiDB");
const jwt = require("jsonwebtoken")
class Likes{
        constructor ({ id_likes, id_usuario,id_pintura, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at, deleted}){
            this.id_likes=id_likes;
            this.id_usuario=id_usuario;
            this.id_pintura=id_pintura;
            this.created_by=created_by;
            this.created_at=created_at;
            this.updated_by=updated_by;
            this.updated_at=updated_at;
            this.deleted_by=deleted_by;
            this.deleted_at=deleted_at;
            this.deleted=deleted;
        }

    static async getAll(id,{limit,offset},{sort,order}){
        const connection = await db.createConnection()
        let query = "SELECT id_likes,id_usuario, id_pintura, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at, deleted FROM likes WHERE deleted=0 AND id_pintura = ?"
        if (sort && order) {
            query += ` ORDER BY ${sort} ${order}`
          }
  
          if (offset >= 0 && limit) {
              query += ` LIMIT ${offset}, ${limit}`;
          }
        const [rows] = await connection.query(query,[id]);
        connection.end()
        return rows
    }
    static async getById(id){
        const connection = await db.createConnection()
        const [rows] = await connection.query(
            "SELECT id_likes, id_pintura, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at, deleted FROM likes WHERE id_likes=? AND deleted=0;",
            [id]
        );
        connection.end();
        if (rows.length > 0){
            const row = rows[0]
            return new Likes ({
                id_likes: row.id_likes,
                id_pintura: row.id_pintura,
                fecha_likes: row.fecha_likes,
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
    async save(){
        const connection = await db.createConnection();

        const [rows] = await connection.execute("SELECT id_likes FROM likes WHERE id_pintura = ? AND id_usuario = ?", [this.id_pintura, this.id_usuario]);
        if (rows.length > 0){
            throw new Error ("Ya existe un like")
        }
        const [result] = await connection.execute(
            "INSERT INTO likes (id_pintura,id_usuario, created_by, created_at) VALUES (?, ?, ?, ?)",
            [this.id_pintura,this.id_usuario , this.created_by, this.created_at]
        );
        connection.end();
        if (result.insertId ==0){
            throw new Error ("No se registro el like")
        }
        this.id_likes = result.insertId;
    }
    
    static async deleteFisicoById(id){
        const connection = await db.createConnection();
        const [result] = await connection.execute(
            "DELETE FROM likes WHERE id_likes = ?",
            [id]
        );
        await connection.end();
        if (result.affectedRows ==0){
            throw new Error ("No se pudo eliminar el like");
        }
        return;
    }
    static async deleteById(like){
        const connection = await db.createConnection();
        const deleted_at = new Date();
        const [result] = await connection.execute(
            "UPDATE likes SET deleted = true, deleted_by = ?, deleted_at = ? WHERE id_usuario = ? AND id_pintura = ?",
            [like.deleted_by,deleted_at, like.id_usuario, like.id_pintura]
        );
        await connection.end();

        if (result.affectedRows ==0){
            throw new Error ("No se pudo eliminar el like");
        }
        return;
    }
    static async updateById(like){
        const connection = await db.createConnection();
        const updateAt= new Date();
        const [result] = await connection.execute(
            "UPDATE likes SET updated_by = ?, updated_at = ?, deleted = 0 WHERE id_usuario = ? AND id_pintura = ?",
            [like.updated_by, updateAt , like.id_usuario ,like.id_pintura ]
            );
            if(result.affectedRows ==0){
                throw new Error ("No se pudo actualizar el like");
            }
            return;
    }
    static async count(id){
        const connection = await db.createConnection();
        const [rows] = await connection.execute(
            "SELECT COUNT(*) FROM likes WHERE id_pintura = ? AND deleted = 0",
            [id]
        );
        connection.end();
        return rows[0]["COUNT(*)"];
    }

    static async getTokenid(token){
        const decoded = jwt.verify(token, process.env.SECRET_NAME)
        return decoded
    }
    static async getLikes(like){
        const connection = await db.createConnection()
        const [rows] = await connection.execute("SELECT id_likes, id_pintura, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at, deleted FROM likes WHERE id_pintura = ? AND id_usuario = ?", [like.id_pintura, like.id_usuario]);
        connection.end()

        return rows
    }
}
module.exports = Likes;