/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.raw(`
    create table pinturas (
    id_pintura int unsigned not null auto_increment ,
    id_usuario int unsigned not null,
    titulo varchar(65),
    descripcion text,
    imagen varchar(255),
    created_by int unsigned,
    created_at date,
    updated_by int unsigned,
    updated_at date,
    deleted_by int unsigned,
    deleted_at date,
    deleted boolean default false,
    primary key (id_pintura),
    constraint fk_idusuario_pinturas foreign key (id_usuario) references usuarios(id_usuario) ON DELETE CASCADE
    );
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.raw("DROP TABLE pinturas")
};
