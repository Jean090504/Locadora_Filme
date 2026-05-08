/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela de gênero
 * Data: 08/05/2026
 * Autor: Jean Costa
 * Versão 1.0
 ********************************************************************************************************************************************/

// Importa a biblioteca do Knex para realizar as operações no banco de dados
const knex = require('knex')

// Importa as configurações do Knex para conectar ao banco de dados
const knexConfig = require('../../database_config_knex/knexFile.js')

// Cria uma instância do Knex usando as configurações de desenvolvimento
const knexConex = knex(knexConfig.development)

// Função para inserir dados na tabela de gênero
async function insertGenero(genero){

    try {
        let sql = `insert into tbl_genero (nome) values ('${genero.nome}');`

                // Executa o comando SQL no banco de dados
                let result = await knexConex.raw(sql)
                
            if(result)
                return result[0].insertId // Retorna o ID do registro inserido
            else
                return false
            
 
        } catch (error) {
            return false
    }
}

// Função para selecionar todos os gêneros cadastrados
async function selectAllGenero() {
    try {
        //Script SQL para selecionar todos os dados da tabela genero ordenados pelo ID de forma decrescente
        let sql = 'select * from tbl_genero order by id desc'

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

// Função para selecionar um gênero específico pelo ID
async function selectGeneroById(id) {
    try {
        //Script SQL para selecionar um gênero específico pelo ID
        let sql = `select * from tbl_genero where id = ${id}`

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

// Função para deletar um gênero específico pelo ID
async function deleteGeneroById(id) {
    try {
        let sql = `delete from tbl_genero where id=${id}`

        // Executa o comando SQL no banco de dados e retorna o resultado da consulta
        let result = await knexConex.raw(sql)

        if(result[0].affectedRows > 0)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

// Função para atualizar um gênero específico pelo ID
async function updateGeneroById(id, genero) {
    try {
        let sql = `update tbl_genero set nome='${genero.nome}' where id=${id}`

        // Executa o comando SQL no banco de dados e retorna o resultado da consulta
        let result = await knexConex.raw(sql)

        if(result[0].affectedRows > 0)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}


module.exports = {
    insertGenero,
    selectAllGenero,
    selectGeneroById,
    deleteGeneroById,
    updateGeneroById
}