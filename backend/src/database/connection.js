const knex = require('knex');
const configuration = require('../../knexfile');//impostando as configurações do knexfile

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;//essa é a nossa variável ambiente

const connection = knex(config);

module.exports = connection;