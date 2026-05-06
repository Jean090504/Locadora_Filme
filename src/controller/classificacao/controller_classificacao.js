/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle de dados do projeto de filmes-Classificacao, realizando as regras de negócio e validando os dados para serem manipulados pelo model
 * Data: 06/05/2026
 * Autor: Jean Costa
 * Versão 1.0
 ********************************************************************************************************************************************/

//Import do arquivo de padrões de mensagens para manter o código mais organizado e facilitar a manutenção
const config_messages = require('../modelo/configMessages.js')

//Import do arquivo de DAO para manipular os dados no banco de dados
const classificacaoDAO = require('../../../model/DAO/classificacao/classificacao.js')

// Funçao para validar os dados da classificacao
const validarDados = async (classificacao) => {
    let message = JSON.parse(JSON.stringify(config_messages))
    
    if(classificacao.nome == undefined || classificacao.nome == "" || classificacao.nome == null || classificacao.nome.length > 15){
        message.ERROR_BAD_REQUEST.field = "[nome] invalido"
        return message.ERROR_BAD_REQUEST
    }          

    if(classificacao.sigla == undefined || classificacao.sigla == "" || classificacao.sigla == null || classificacao.sigla.length > 5){
        message.ERROR_BAD_REQUEST.field = "[sigla] invalido"
        return message.ERROR_BAD_REQUEST
    }

    if(classificacao.descricao == undefined || classificacao.descricao == "" || classificacao.descricao == null || classificacao.descricao.length > 255){
        message.ERROR_BAD_REQUEST.field = "[descricao] invalido"
        return message.ERROR_BAD_REQUEST
    }
    
    return false // Retorna falso se não houver erro
}

const inserirClassificacao = async (classificacao, contentType) => {
    let message = JSON.parse(JSON.stringify(config_messages))    
    
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let validar = await validarDados(classificacao)

            if(validar){
                return validar
            } else {
                let result = await classificacaoDAO.insertClassificacao(classificacao)

                if(result){
                    classificacao.id = result 
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = classificacao
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
                return message.DEFAULT_MESSAGE
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error("Erro no Controller:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirClassificacao
}