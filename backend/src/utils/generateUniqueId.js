const crypto = require('crypto');

module.exports =  function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');// gera 4 caracteres aleatorios e os transforma para hexadecimal
}