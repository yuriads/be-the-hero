const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;//caso não exista nenhum ele fica como padrão a pagina 1

        const [count] = await connection('incidents').count();//colocamos o [count] desse jeito que é para pegar a primeira posição

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//relacionando dados de duas tabelas ou mais
        .limit(5)
        .offset((page - 1) * 5)
        .select('incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.city',
        'ongs.uf');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        // acessando o cabeçalho da nossa requisição. ele guarda informações do contexto dessa nossa requisição e aqui geralmente vem dados da autenticação do usuário e localização.
        const ong_id = request.headers.authorization;//

        //a primeira chave do registro vai ser salvo dentro de uma variável id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;//precisamos verificar se o nosso incident realmente foi criado pela nossa ong para poder deletar, evitando ela deletar de outros.

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();//retorna apenas um resultado

        if(incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permited.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();//retornando uma mensagem que não tem conteúdo, mas com sucesso.
    },
};