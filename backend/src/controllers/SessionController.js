const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        //verificando se a ong realmente existe para podermos efetuar o login dela
        const { id } = request.body;//buscando o id atraves do corpo da nossa requisição

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if(!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID.'});
        }

        return response.json(ong);
    }
}