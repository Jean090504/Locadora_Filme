/*******************************************************************************************************************************************
* Objetivo: Arquivo responsável por definir as rotas da API do projeto de filmes
* Data: 17/04/2026
* Autor: Jean Costa
* Versão 1.0
* No CRUD não precisa mudar o nome do ENDPOINT, mas sim o verbo de utilizado para cada ação (GET, POST, PUT, DELETE)
********************************************************************************************************************************************/

const express = require('express')
const rota = express.Router()
const controllerFilme = require('../../controller/filme/controller_filme.js')
const bodyParser = require('body-parser')

//Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

// Rota para inserir um novo filme
rota.post('/filme', bodyParserJSON, async (request, response) => {
    // recebe o conteudo dentro do body da requisição
    let dados = request.body
    let conteType = request.headers['content-type']// linha adicionada para receber o content-type do header da requisição

    let result = await controllerFilme.inserirNovoFilme(dados,conteType)
    
    response.status(result.status_code)
    response.json(result)
})

// Rota para listar todos os filmes
rota.get('/filme', async (request, response) => {
    let result = await controllerFilme.listarFilmes()

    response.status(result.status_code)
    response.json(result)

})

//Rota para retornar um filme específico, utilizando o ID do filme como parâmetro
rota.get('/filme/:id', async (request, response) => {
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = rota