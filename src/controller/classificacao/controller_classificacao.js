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

// Função para inserir uma nova classificação
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

// Função para listar todas as classificações
const listarClassificacao = async () => {
    let message = JSON.parse(JSON.stringify(config_messages))

    try {
        let result = await classificacaoDAO.selectAllFilme()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.classificacao = result

                //200 (Dados do filme)
                return message.DEFAULT_MESSAGE 
            }else{
                //404 (Nenhum filme encontrado)
                return message.ERROR_NOT_FOUND
            }
        }else{
            //500 (Erro interno no servidor)
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
        
    } catch (error) {
        console.error("Erro no Controller:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para selecionar uma classificação específica, utilizando o ID como parâmetro
const listarClassificacaoPorID = async (id) => {
    let message = JSON.parse(JSON.stringify(config_messages))

    try {
        //Validação para verificar se o ID é válido (não vazio, não nulo, não indefinido e é um número)
        if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = `[ID] invalido`
            return message.ERROR_BAD_REQUEST //400
        }else{
            let result = await classificacaoDAO.selectByIdFilme(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.classificacao = result[0]

                    //200 (Dados do filme)
                    return message.DEFAULT_MESSAGE
                }else{
                    //404 (Nenhum filme encontrado)
                    return message.ERROR_NOT_FOUND
                }
            }else{
                //500 (Erro interno no servidor)
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        console.error("Erro no Controller:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para deletar uma classificação específica, utilizando o ID como parâmetro
const deletarClassificacaoPorID = async (id) => {
    let message = JSON.parse(JSON.stringify(config_messages))

    try {
        let resultBuscarID = await listarClassificacaoPorID(id)

        //Validação para verificar se o ID é válido (não vazio, não nulo, não indefinido e é um número)
        if(resultBuscarID.status){
            let result = await classificacaoDAO.deleteByIdFilme(id)

            if(result){
                return message.SUCCESS_DELETED_ITEM //200
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            message.ERROR_BAD_REQUEST.field = `[ID] invalido`
            return message.ERROR_BAD_REQUEST //400
        }
    }catch (error) {
        console.error("Erro no Controller:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para atualizar uma classificação específica, utilizando o ID como parâmetro
const atualizarClassificacaoPorID = async (id, classificacao, contentType) => {
    let message = JSON.parse(JSON.stringify(config_messages))

    try {
        //Validação do contentType
        if(String(contentType).toLocaleLowerCase() == 'application/json') {
        
        //Validação com ID incorreto
        let resultBuscarID = await listarClassificacaoPorID(id)

        if(resultBuscarID.status){
            let validar = await validarDados(classificacao)

            if(!validar){
                classificacao.id_classificacao = id

                let result = await classificacaoDAO.updateClassificacao(classificacao)

                if(result){
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATE_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATE_ITEM.message
                    message.DEFAULT_MESSAGE.response = classificacao

                    return message.DEFAULT_MESSAGE //200
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validar //400
            }

        } else {
            return resultBuscarID //400 ou //404 ou //500
        }
    }else{
        return message.ERROR_CONTENT_TYPE //415
    }

    } catch (error) {
        console.error("Erro no Controller:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

module.exports = {
    inserirClassificacao,
    listarClassificacao,
    listarClassificacaoPorID,
    deletarClassificacaoPorID,
    atualizarClassificacaoPorID
}