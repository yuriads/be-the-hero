const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');//imports para validação do backend

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const connection = require('./database/connection');

const routes = express.Router();//estamos colocando o módulo Router dentro de um variável

//criando uma rota para a sessão de login
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), SessionController.create);

// criando uma rota para listar todas as ongs
routes.get('/ongs', OngController.index);

//criando uma rota para inserir uma ong dentro do banco de dados
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({//colocamos o [Segments.BODY] entre colchetes pq ele é uma variável do javascript
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),//DAR UMA OLHADA AQUI... NÃO ESTÁ FUNCIONANDO
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

//listando as postagens de uma certa ong
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),//colocamos o unknown pq pode ter propriedades através do header que eu não sei, pois ela envia vários headers
}), ProfileController.index);

// criando uma rota para listar todas os incidents
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index);

//criando uma rota para inserir um incidente dentro do banco de dados
//Tarefinha: fazer a validadçao da criacão dos incidents
//para fazer isso temos que fazer dois tipos de validação. a do HEADER e a do BODY
routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().max(40),
    description: Joi.string().required(),
    value: Joi.number().required(),
  }),
}), IncidentController.create);

//deletando um incident
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete);

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