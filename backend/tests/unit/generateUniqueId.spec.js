const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {//categoria do arquivo de teste
    it('should generate an unique ID', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8)//para dar sucesso o id tem que ter 8 caracteres
    });
});