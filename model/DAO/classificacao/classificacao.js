/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela Classificação
 * Data: 06/05/2026
 * Autor: Jean Costa
 * Versão 1.0
 ********************************************************************************************************************************************/

// Importa a biblioteca do Knex para realizar as operações no banco de dados
const knex = require('knex')

// Importa as configurações do Knex para conectar ao banco de dados
const knexConfig = require('../../database_config_knex/knexFile.js')

// Cria uma instância do Knex usando as configurações de desenvolvimento
const knexConex = knex(knexConfig.development)

// Função para inserir dados na tabela Classificação
insertClassificacao = async (classificacao) => {
    try {

        let sql = `insert into tbl_classificacao (
                                                    nome,
                                                    sigla,
                                                    descricao) values(
                                                        '${classificacao.nome}',
                                                        '${classificacao.sigla}',
                                                        '${classificacao.descricao}'
                                                    );`

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

// Função para selecionar todas as classificações do banco de dados
selectAllClassificacao = async () => {
    try {
        let sql = `select * from tbl_classificacao order by id desc`
        let result = await knexConex.raw(sql)

        if(result[0].length > 0)
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

// Função para selecionar uma classificação específica do banco de dados, utilizando o ID como parâmetro
selectByIdClassificacao = async (id) => {
    try {
        let sql = `select * from tbl_classificacao where id=${id}`

        // Executa o comando SQL no banco de dados e retorna o resultado da consulta
        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
        return result[0] // Retorna apenas o array de dados
     else 
        return false

    } catch (error) {
        return false
    }
}

// Função para deletar uma classificação específica do banco de dados, utilizando o ID como parâmetro
deleteByIdClassificacao = async (id) => {
    try {
        let sql = `delete from tbl_classificacao where id=${id}`

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

// Função para atualizar uma classificação específica do banco de dados, utilizando o ID como parâmetro
updateClassificacao = async (classificacao, id) => {
    try {
        let sql = `update tbl_classificacao set 
                        nome = '${classificacao.nome}',
                        sigla = '${classificacao.sigla}',
                        descricao = '${classificacao.descricao}'
                   where id = ${classificacao.id_classificacao}`

        // Executa o comando SQL no banco de dados e retorna o resultado da consulta
        let result = await knexConex.raw(sql)

        if(result[0].affectedRows > 0)
            return true
        else
            return false

    } catch (error) {
        console.error("Erro na Model:", error)
        return false
    }
}

module.exports = {
    insertClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteByIdClassificacao,
    updateClassificacao
}