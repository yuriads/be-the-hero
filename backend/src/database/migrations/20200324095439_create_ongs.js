
exports.up = function(knex) {
    // o metodo up sempre vai ser para criar uma nova tabela
  // Para criar uma nova tabela
  return knex.schema.createTable('ongs', function(table) {
    table.string('id').primary();//transforma essa coluna em uma primary Key
    table.string('name').notNullable();//o notNullablee faz com que esse campo não seja nulo
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();//o segundo parâmetro faz eu dizer qual o tamnho exato da string
  });
};

exports.down = function(knex) {
  //o método down é para se acontecer algum problema temos o que saber o que desfazer
  return knex.schema.dropTable('ongs');//deletando a tabela caso algo der errado
};
