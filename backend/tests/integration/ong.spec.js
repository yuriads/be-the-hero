const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();//zerando o banco de dados antes de começarmos os testes para não atrapalhar nos outros tests e encher o banco de dados
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        //.set('Authorization', 'id valido de uma ong aqui dentro')//usamos .ser() só quando fizermos testes de integração em rotas que tem headers
        .send({
            name: "APAD4",
            email: "contado@gmail.com",
            whatsapp: "89000000000",
            city: "Floriano",
            uf: "PI"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});