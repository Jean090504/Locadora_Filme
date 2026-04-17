/*******************************************************************************************************************************************
* Objetivo: Arquivo responsável por definir as rotas da API do projeto de filmes
* Data: 17/04/2026
* Autor: Jean Costa
* Versão 1.0
********************************************************************************************************************************************/

const express = require('express')
const rota = express.Router()
const controllerFilme = require('../../controller/filme/controller_filme.js')
const bodyParser = require('body-parser')

//Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

// Rota para inserir um novo filme
rota.post('/filme', bodyParserJSON, async (request, response) => {
    let dados = request.body

    let result = await controllerFilme.inserirNovoFilme(dados)

    response.status(result.status_code)
    response.json(result)
})

module.exports = rota