/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.raw(`
    create table seguidores(
    id_seguidor int unsigned not null auto_increment ,
    id_usuario int unsigned not null,
    id_seguido int unsigned not null,
    created_by int unsigned,
    created_at date,
    updated_by int unsigned,
    updated_at date,
    deleted_by int unsigned,
    deleted_at date,
    deleted boolean default false,
    primary key (id_seguidor),
    constraint fk_idusuario_seguidores foreign key (id_usuario) references usuarios(id_usuario) ON DELETE CASCADE,
    constraint fk_idusuario_seguidores_2 foreign key (id_seguido) references usuarios(id_usuario) ON DELETE CASCADE
    );
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.raw("DROP TABLE seguidores")
};
