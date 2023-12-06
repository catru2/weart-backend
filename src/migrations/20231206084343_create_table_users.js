/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.raw(`
  create table usuarios (
    id_usuario int unsigned primary key auto_increment not null,
    nombre varchar(65),	
    correo varchar(65),
    contrasena varchar(65),
    fecha_nacimiento date,
    biografia text ,
    created_at date,
    updated_at date,
    deleted boolean default false,
    deleted_at date 
    );
    `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.raw("DROP TABLE usuarios")
};
