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
    if(filme.nome == ""  || filme.nome == null || filme.nome == undefined || filme.nome.length >  80){
       message.ERROR_BAD_REQUEST.field = "[nome] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA DATA    
    }else if(filme.data_lancamento == "" || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10 ){
       message.ERROR_BAD_REQUEST.field = "[DATA_LANCAMEMTO] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA DURACAO
    }else if (filme.duracao == "" || filme.duracao == null || filme.duracao == undefined || filme.duracao.length  < 5  ){
       message.ERROR_BAD_REQUEST.field = "[DURACAO] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA SINOPSE
    }else if (filme.sinopse == ""       || filme.sinopse == null || filme.sinopse == undefined ){
       message.ERROR_BAD_REQUEST.field = "[SINOPSE] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA AVALIACAO
    }else if(isNaN(filme.avaliacao) || filme.avaliacao.length > 3 ){
       message.ERROR_BAD_REQUEST.field = "[AVALIACAO] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA VALOR
    }else if (filme.valor == "" || filme.valor == null || filme.valor == undefined || filme.valor.split('.')[0].length > 3 || isNaN( filme.valor) ){
       message.ERROR_BAD_REQUEST.field = "[VALOR] invalido"
       return message.ERROR_BAD_REQUEST
       
   //VALIDA CAPA
    }else if(filme.capa.length > 255){
       message.ERROR_BAD_REQUEST.field = "VALOR invalido"
       return message.ERROR_BAD_REQUEST

    }else{   
        return false 
    } 
}

//Função para inserir um novo filme
async function inserirNovoFilme(filme,conteType) {

    //criando clone  do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_messages))    

    try {

        if (String(conteType).toLocaleLowerCase()== 'application/json') {
            
        
            let validar = await validarDados(filme)

            //se validar retornanr algo significa que é json de ero e ja sera retornado 
            if(validar){
                return validar
            }else{
                // manda os filmes para o DAO
                let result = await filmeDAO.insertFilme(filme)
                if (result) {
                    message.DEFAULT_MESSAGE.status      = message.SUCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCESS_CREATED_ITEM.message    
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL//erro 500
                    
                }
                return message.DEFAULT_MESSAGE
            }
        }else{return message.ERROR_CONTENT_TYPE}//415
            
    }catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    
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