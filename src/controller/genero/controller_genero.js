/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle de dados do projeto de filmes-genero
 * Data: 08/05/2026
 * Autor: Jean Costa
 * Versão 1.0
 ********************************************************************************************************************************************/

//Import do arquivo de padrões de mensagens para manter o código mais organizado e facilitar a manutenção
const config_messages = require('../modelo/configMessages.js')

//Import do arquivo de DAO para manipular os dados no banco de dados
const generoDAO = require('../../../model/DAO/genero/genero.js')

// Função para validar os dados do gênero
const validarDados = async (genero) => {
    let message = JSON.parse(JSON.stringify(config_messages))
    
    if(genero.nome == undefined || genero.nome == "" || genero.nome == null || genero.nome.length > 40){
        message.ERROR_BAD_REQUEST.field = "[nome] invalido"
        return message.ERROR_BAD_REQUEST
    }          
    
    return false // Retorna falso se não houver erro
}

// Função para inserir um novo gênero
const inserirGenero = async (genero, contentType) => {
    let message = JSON.parse(JSON.stringify(config_messages))

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let validar = await validarDados(genero)

            if(validar){
                return validar
            } else {
                let result = await generoDAO.insertGenero(genero)

                if(result){
                    genero.id = result 
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = genero
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
                return message.DEFAULT_MESSAGE
            }
        }else{
            return message.ERROR_INVALID_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_MODEL
    }
}

// Função para selecionar todos os gêneros cadastrados
const listarGenero = async () => {
    let message = JSON.parse(JSON.stringify(config_messages))

    try {
        let result = await generoDAO.selectAllGenero()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.message = message.SUCCESS_RESPONSE.message
                message.DEFAULT_MESSAGE.response = result

                return message.DEFAULT_MESSAGE
            }else{
                //404 (Nenhum genero encontrado)
                return message.ERROR_NOT_FOUND
            }
        }else{
            //500 (Erro interno no servidor)
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
        
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_MODEL
    }
}

// Função para selecionar um gênero específico pelo ID
const listarGeneroById = async (id) => {
    let message = JSON.parse(JSON.stringify(config_messages))

    try {
        //Validação para verificar se o ID é válido (não vazio, não nulo, não indefinido e é um número)
        if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = `[ID] invalido`
            return message.ERROR_BAD_REQUEST //400
        }else{
            let result = await generoDAO.selectGeneroById(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_RESPONSE.message
                    message.DEFAULT_MESSAGE.response = result[0]

                    return message.DEFAULT_MESSAGE
                }else{
                    //404 (Nenhum genero encontrado)
                    return message.ERROR_NOT_FOUND
                }
            }else{
                //500 (Erro interno no servidor)
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }  
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_MODEL
    }
}

// Função para deletar um gênero específico pelo ID
const deletarGeneroById = async (id) => {
    let message = JSON.parse(JSON.stringify(config_messages))

    try {
        let validaBuscaID = await listarGeneroById(id)

        //Validação para verificar se o ID é válido (não vazio, não nulo, não indefinido e é um número)
        if(validaBuscaID.status){
            let result = await generoDAO.deleteGeneroById(id)
        
            if(result){
                    return message.SUCCESS_DELETED_ITEM //200
            }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            message.ERROR_BAD_REQUEST.field = `[ID] invalido`
            return message.ERROR_BAD_REQUEST //400
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_MODEL
    }

}

//Função para atualizar um gênero específico pelo ID
const atualizarGeneroById = async (id, genero, contentType) => {
    let message = JSON.parse(JSON.stringify(config_messages))

    let validaBuscaID = await listarGeneroById(id)

    if(validaBuscaID.status){
        try {
            if (String(contentType).toLowerCase() == 'application/json') {
                let validar = await validarDados(genero)

                if(validar){
                    return validar
                } else {
                    let result = await generoDAO.updateGeneroById(id, genero)

                    if(result){
                        genero.id = id
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_RESPONSE.message
                        message.DEFAULT_MESSAGE.response = genero
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                    return message.DEFAULT_MESSAGE
                }
            }else{
                return message.ERROR_INVALID_CONTENT_TYPE
            }
        } catch (error) {
            console.log(error)
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
    }else{
        message.ERROR_BAD_REQUEST.field = `[ID] invalido`
        return message.ERROR_BAD_REQUEST //400
    }
}


module.exports = {
    inserirGenero,
    listarGenero,
    listarGeneroById,
    deletarGeneroById,
    atualizarGeneroById
}