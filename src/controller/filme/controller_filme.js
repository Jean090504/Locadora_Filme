/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle de dados do projeto de filmes, realizando as regras de negócio e validando os dados para serem manipulados pelo model
 * Data: 15/04/2026
 * Autor: Jean Costa
 * Versão 1.0
 ********************************************************************************************************************************************/

//Import do arquivo de padrões de mensagens para manter o código mais organizado e facilitar a manutenção
const config_messages = require('../modelo/configMessages.js')

//Import do arquivo de DAO para manipular os dados no banco de dados
const filmeDAO = require('../../../model/DAO/filme/filme.js')

//Função para inserir um novo filme
const inserirNovoFilme = async (filme) => {

    //Criando uma cópia do objeto de mensagens para evitar alterações acidentais no objeto original
    let message = JSON.parse(JSON.stringify(config_messages))

    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'

    }else if(filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined  || filme.data_lancamento.length != 10){
        message.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDA'
        
    }else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDA'

    }else if (filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDA'

    }else if(isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDA'

    }else if(filme.valor == '' || filme.valor == null || filme.valor == undefined ||filme.valor.length > 5 || isNaN(filme.valor)) {
        message.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'

    }else if(filme.capa.length > 255) {
        message.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDA'

    }else{
        let result = await filmeDAO.insertFilme(filme)

        if(result){//201
            message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
        }else{//400
            message.DEFAULT_MESSAGE.status = message.ERROR_BAD_REQUEST.status
            message.DEFAULT_MESSAGE.status_code = message.ERROR_BAD_REQUEST.status_code
            message.DEFAULT_MESSAGE.message = message.ERROR_BAD_REQUEST.message            
            message.DEFAULT_MESSAGE.field = message.ERROR_BAD_REQUEST.field
        }
    }
    return message.DEFAULT_MESSAGE
}

//Função para atualizar um filme existente
const atualizarFilme = async (filme) => {

}

//Função para selecionar todos os filmes
const listarFilmes = async () => {

}

//Função para selecionar um filme pelo ID
const buscarFilme = async (id) => {

}

//Função para excluir um filme pelo ID
const excluirFilme = async (id) => {

}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilmes,
    buscarFilme,
    excluirFilme
}