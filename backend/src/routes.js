const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const connection = require('./database/connection');

const routes = express.Router();//estamos colocando o módulo Router dentro de um variável

//criando uma rota para a sessão de login
routes.post('/sessions', SessionController.create);

// criando uma rota para listar todas as ongs
routes.get('/ongs', OngController.index);
//criando uma rota para inserir uma ong dentro do banco de dados
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

// criando uma rota para listar todas os incidents
routes.get('/incidents', IncidentController.index);
//criando uma rota para inserir um incidente dentro do banco de dados
routes.post('/incidents', IncidentController.create);
//deletando um incident
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;


//ANOTAÇÕES EXTRAS
/**
 * Métodos HTTP:
 * GET: busar/listar informações do back-end
 * POST: Criar um informação no back-end
 * PUT: Alterar um informação no back-end
 * DELETE: deletar uma informação no back-end
 */

 /**
  * Tipos de parâmetros:
  * 
  * Query Params: são parâmetros nomeados enviados na rota após o simbolo de "?", que servem para filtro, paginação. usamos REQUEST.QUERY
  * Route Params: são parâmetros utilizados para identificar recursos, serve para identificar os dados de um único recurso. ex: "/:id". usamso REQUEST.PARAMS. no route params não podemos enviar parâmetros a mais do que está sendo esperado
  * Request Body: Corpo da requisição utilizado para criar ou alterar recursos
  */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where() --> com isso ele está pronto para aceitar qualquer banco SQL
 */