const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();//instanciando a palicação

app.use(cors());//para colocarmos o endereço usamor o parâmetro origin: 'URL'
app.use(express.json());//serve para a aplicação entender formato json das requisições. serve para antes das requisições transformar o json em objeto javaScript
app.use(routes);//logo abaixo do express.json para poder funcionar


app.listen(3333);//ouvindo essa porta para acessar a nossa aplicação