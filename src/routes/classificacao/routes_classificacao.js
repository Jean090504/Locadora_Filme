/*******************************************************************************************************************************************
* Objetivo: Arquivo responsável por definir as rotas da API do projeto de filmes-classificacao
* Data: 06/05/2026
* Autor: Jean Costa
* Versão 1.0
* No CRUD não precisa mudar o nome do ENDPOINT, mas sim o verbo de utilizado para cada ação (GET, POST, PUT, DELETE)
********************************************************************************************************************************************/

const express = require('express')
const rota = express.Router()
const controllerClassificacao = require('../../controller/classificacao/controller_classificacao.js')
const bodyParser = require('body-parser')

//Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

// Rota para inserir uma nova classificação
rota.post('/classificacao', bodyParserJSON, async function(request, response) {
    // Obtém o valor do cabeçalho Content-Type da requisição
    let contentType = request.headers['content-type']

    // Chama a função do controller para inserir a classificação, passando os dados do corpo da requisição e o Content-Type
    let result = await controllerClassificacao.inserirClassificacao(request.body, contentType)

    // Define o status da resposta com base no status_code retornado pelo controller
    response.status(result.status_code)
    response.json(result)
})

module.exports = rota