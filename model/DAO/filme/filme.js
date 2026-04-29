/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela Filme
 * Data: 15/04/2026
 * Autor: Jean Costa
 * Versão 1.0
 ********************************************************************************************************************************************/

// Importa a biblioteca do Knex para realizar as operações no banco de dados
const knex = require('knex')

// Importa as configurações do Knex para conectar ao banco de dados
const knexConfig = require('../../database_config_knex/knexFile.js')

// Cria uma instância do Knex usando as configurações de desenvolvimento
const knexConex = knex(knexConfig.development)

// Função para inserir dados na tabela Filme
async function insertFilme(filme){

    try {
    let sql = `insert into tbl_filme (
						nome, 
						data_lancamento,
                        duracao, sinopse, 
						avaliacao, 
						valor, 
                        capa)
					values(
                        '${filme.nome}',
                        '${filme.data_lancamento}',
                        '${filme.duracao}',
                        '${filme.sinopse}',
                        if('${filme.avaliacao}' = "", null,'${filme.avaliacao}'),
                        '${filme.valor}',
                        '${filme.capa}'
                    );`

                // Executa o comando SQL no banco de dados
                let result = await knexConex.raw(sql)

            if(result)
                return true 
            else
                return false
            

        } catch (error) {
            return false
    }
}

// Função para atualizar dados na tabela Filme
const updateFilme = async (filme) => {

    try{
        let sql = `update tbl_filme 
                set nome = '${filme.nome}',
                    data_lancamento = '${filme.data_lancamento}',
                    duracao = '${filme.duracao}',
                    sinopse = '${filme.sinopse}',
                    avaliacao = if('${filme.avaliacao}' = "", null,'${filme.avaliacao}'),
                    valor = '${filme.valor}',
                    capa = '${filme.capa}'
                where id = ${filme.id};`

        // Executa o comando SQL no banco de dados
        let result = await knexConex.raw(sql)

        if(result)
            return true 
        else
            return false
        

    }catch(error){
        return false 
    }


}

// Função para selecionar todos os dados na tabela Filme
const selectAllFilme = async () => {
    try {
        //Script SQL para selecionar todos os dados da tabela Filme ordenados pelo ID de forma decrescente
        let sql = 'select * from tbl_filme order by id desc'

        // Executa o comando SQL no banco de dados e retorna o resultado da consulta
        let result = await knexConex.raw(sql)

        //Validação para verificar se o Banco de Dados é um array
        //Se o script der errado ou não houver registros, o resultado não será um array, e a função retornará false
        if(Array.isArray(result)){
            return result[0] // Retorna apenas o array de dados, ignorando os metadados
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


// Função para selecionar um dado na tabela Filme pelo ID
const selectByIdFilme = async (id) => {
    try {
        //Script SQL para selecionar um dado da tabela Filme pelo ID
        let sql = `select * from tbl_filme where id=${id}`

        // Executa o comando SQL no banco de dados e retorna o resultado da consulta
        let result = await knexConex.raw(sql)

        //Validação para verificar se o Banco de Dados é um array
        //Se o script der errado ou não houver registros, o resultado não será um array, e a função retornará false
        if(Array.isArray(result))
            return result[0] // Retorna apenas o array de dados
         else 
            return false
        
    } catch (error) {
        return false
    }
}

        
// Função para deletar dados na tabela Filme pelo ID
const deleteFilme = async (id) => {
    try {
        //Script SQL para deletar um dado da tabela Filme pelo ID
        let sql = `delete from tbl_filme where id=${id}`

        // Executa o comando SQL no banco de dados e retorna o resultado da consulta
        let result = await knexConex.raw(sql)

        //Validação para verificar se o Banco de Dados é um array
        //Se o script der errado ou não houver registros, o resultado não será um array, e a função retornará false
        if(Array.isArray(result))
            return result[0] // Retorna apenas o array de dados
         else 
            return false
        
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}
