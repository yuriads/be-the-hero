
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        table.increments();//faz com que a primary key seja auto incrementada

        table.string('title').notNullable();//o notNullablee faz com que esse campo não seja nulo
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');//criando uma chave estrangeira
      });
    };

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');//deletando a tabela caso algo der errado
};
