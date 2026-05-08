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

//Função para validar os dados do filme, garantindo que os dados estejam corretos antes de serem processados pelo model
async function validarDados(filme) {
    //Criando uma cópia do objeto de mensagens para evitar alterações acidentais no objeto original
    let message = JSON.parse(JSON.stringify(config_messages))

    //VALIDA NOME
    if(filme.nome == undefined || filme.nome == ""  || filme.nome == null || filme.nome.length >  80){
       message.ERROR_BAD_REQUEST.field = "[nome] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA DATA    
    }else if(filme.data_lancamento == undefined || filme.data_lancamento == "" || filme.data_lancamento == null || filme.data_lancamento.length != 10 ){
       message.ERROR_BAD_REQUEST.field = "[DATA_LANCAMEMTO] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA DURACAO
    }else if (filme.duracao == undefined || filme.duracao == "" || filme.duracao == null || filme.duracao.length  < 5  ){
       message.ERROR_BAD_REQUEST.field = "[DURACAO] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA SINOPSE
    }else if (filme.sinopse == undefined || filme.sinopse == ""       || filme.sinopse == null ){
       message.ERROR_BAD_REQUEST.field = "[SINOPSE] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA AVALIACAO
    }else if(isNaN(filme.avaliacao) || filme.avaliacao.length > 3 ){
       message.ERROR_BAD_REQUEST.field = "[AVALIACAO] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA VALOR
    }else if (filme.valor == undefined || filme.valor == "" || filme.valor == null || filme.valor.split('.')[0].length > 3 || isNaN( filme.valor) ){
       message.ERROR_BAD_REQUEST.field = "[VALOR] invalido"
       return message.ERROR_BAD_REQUEST
       
   //VALIDA CAPA
    } else if (filme.capa == undefined || filme.capa == null || filme.capa.length > 255) {
        message.ERROR_BAD_REQUEST.field = "[CAPA] invalido"
        return message.ERROR_BAD_REQUEST


    }else{   
        return false 
    } 
}

//Função para inserir um novo filme
async function inserirNovoFilme(filme,contentType) {

    //criando clone do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_messages))    

    try {

        if (String(contentType).toLocaleLowerCase()== 'application/json') {
            
        
            let validar = await validarDados(filme)

            //se validar retornar algo significa que é json e ja sera retornado 
            if(validar){
                return validar
            }else{
                // manda os filmes para o DAO
                let result = await filmeDAO.insertFilme(filme)
                if (result) { //201
                    filme.id = result //Adiciona o ID do filme inserido no JSON para ser retornado na resposta da API
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = filme

                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL// 500
                    
                }
                return message.DEFAULT_MESSAGE
            }
        }else{return message.ERROR_CONTENT_TYPE}//415
            
    }catch (error) {
        console.error("Erro no Controller:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    
}

//Função para atualizar um filme existente
const atualizarFilme = async (filme, id, contentType) => {
    //criando clone do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_messages))  

    try {

        //Validação do contentType
        if(String(contentType).toLocaleLowerCase() == 'application/json') {

            //Validação com ID incorreto
            let resultBuscarID = await buscarFilme(id)

            //Se a função do buscar encontrar o filme retorna verdadeiro, significa que existe no banco de dados, porém se retornar falso, podera retornar 400, 404 ou o 500 
            if(resultBuscarID.status){
                let validar = await validarDados(filme)

                //Validação de campos obrigatórios para atualização
                if(!validar){

                    //Adiciono o atributo ID do filme no JSON para ser enviado ao DAO
                    filme.id = id
                    
                    //Chama a função do DAO para atualizar as informações do filme
                    let result = await filmeDAO.updateFilme(filme)

                    if(result){
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATE_ITEM.message
                        message.DEFAULT_MESSAGE.response = filme

                        return message.DEFAULT_MESSAGE //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return validar //400
                }

            }else{
                return resultBuscarID //400 ou //404 ou //500
            }

        }else{
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para selecionar todos os filmes
const listarFilmes = async () => {
    //criando clone do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_messages))    

    try {
        //Chama a função do DAO para retornar todos os filmes do banco de dados
        let result = await filmeDAO.selectAllFilme()

        //Validação para verificar se o DAO conseguiu processar os dados 
        if(result){
            //Validação para verificar se existe conteúdo no array
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filme = result      
                
                return message.DEFAULT_MESSAGE //200 (Dados do filme)
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        } else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 
    }
}

//Função para selecionar um filme pelo ID
const buscarFilme = async (id) => {
    //criando clone do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_messages))    

    try{
        //Validação para verificar se o ID é válido (não vazio, não nulo, não indefinido e é um número)
        if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = `[ID] invalido`
            return message.ERROR_BAD_REQUEST //400
        } else {
            //Chama a função do DAO para retornar o filme do banco de dados
            let result = await filmeDAO.selectByIdFilme(id)

            //Validação para verificar se o DAO conseguiu processar os dados
            if(result){
                //Validação para verificar se existe conteúdo no array
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme = result[0]      
                    
                    return message.DEFAULT_MESSAGE //200 (Dados do filme)
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }  

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 
    }
}

//Função para excluir um filme pelo ID
const excluirFilme = async (id) => {
    //criando clone do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_messages))    

    try {
        if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = `[ID] invalido`
            return message.ERROR_BAD_REQUEST //400
        }  else {
            //Chama a função do DAO para retornar o filme do banco de dados
            let result = await filmeDAO.deleteFilme(id)

            //Validação para verificar se o DAO conseguiu processar os dados
            if(result){
                //Validação para verificar se existe conteúdo no array
                if(result){ 
                    return message.SUCCESS_DELETED_ITEM //200 (Filme excluido com sucesso)
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }  

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 
    }
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilmes,
    buscarFilme,
    excluirFilme,
}