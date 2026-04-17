/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável por armazenar as mensagens de resposta da API, para manter o código mais organizado e facilitar a manutenção
 * Data: 17/04/2026
 * Autor: Jean Costa
 * Versão 1.0
 ********************************************************************************************************************************************/

//Padronização de cabeçalho para retorno dos endpoints da API, para manter o código mais organizado e facilitar a manutenção
const DEFAULT_MESSAGE = {
    api_description: 'API para cadastro de filmes',
    development: 'Jean Costa Alves da Silva',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}

//Mensagem de erro para requisição com dados incorretos ou incompletos, para manter o código mais organizado e facilitar a manutenção
const ERROR_BAD_REQUEST = {
    status: false,
    status_code: 400,
    message: 'Os dados enviados na requisição estão incorretos ou incompletos. Verifique os dados e tente novamente.'
}

//Mensagem de sucesso para insert, para manter o código mais organizado e facilitar a manutenção
const SUCCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Registro inserido com sucesso.'
}


module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCCESS_CREATED_ITEM
}