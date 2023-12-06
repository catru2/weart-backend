/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.raw(`
    create table likes(
    id_likes int unsigned not null auto_increment,
    id_pintura int unsigned not null,
    id_usuario int unsigned not null,
    created_by int unsigned,
    created_at date,
    updated_by int unsigned,
    updated_at date,
    deleted_by int unsigned,
    deleted_at date,
    deleted boolean default false,
    primary key (id_likes),
    constraint fk_pinturas_likes foreign key (id_pintura) references pinturas(id_pintura) ON DELETE CASCADE,
    constraint fk_usuaario_likes foreign key (id_usuario) references usuarios(id_usuario) ON DELETE CASCADE
    );
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.raw("DROP TABLE likes")
};
