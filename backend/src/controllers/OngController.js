//const crypto = require('crypto');//além de criptografia, o crypto serve para gerar textos aleatórios
const generateUniqueId = require ('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    // para acessar todos os parametos que vem dos Query (request.query)
    // para acessar os dados de um único usuario do Route (request.params)
    // para acessar o corpo (request.body)

    // fazendo uma desestruturação para pegar cada dado em uma variavel separado
    // com isso evita que o usuario envie um dado que a gente não quer que ele preencha

    async index(request, response) {
        const ongs = await connection('ongs').select('*');//listando as ongs, selecionando todos os registros dentra da tabela ong
    
        return response.json(ongs);
    },

    async create(request, response) {//o request guarda todos os dados que vem da nossa requisição e o response é responsável por retornar uma informção para um usuário
        const { name, email, whatsapp, city, uf} = request.body;

        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })


        return response.json({ id });
    }
};