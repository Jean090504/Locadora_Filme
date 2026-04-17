/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela Filme
 * Data: 15/04/2026
 * Autor: Jean Costa
 * Versão 1.0
 ********************************************************************************************************************************************/

// Importa a biblioteca do Knex para realizar as operações no banco de dados
const knex = require('knex.js')

// Importa as configurações do Knex para conectar ao banco de dados
const knexConfig = require('../../database_config_knex/knexFile.js')

// Cria uma instância do Knex usando as configurações de desenvolvimento
const knexConex = knex(knexConfig.development)


// Função para inserir dados na tabela Filme
const insertFilme = async (filme) => {
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
                        '${filme.avaliacao}',
                        '${filme.valor}',
                        '${filme.capa}'
                        );`

// Executa o comando SQL no banco de dados
let result = await knexConex.raw(sql)

if (result) 
    return true
 else 
    return false
}

// Função para atualizar dados na tabela Filme
const updateFilme = async (filme) => {

}

// Função para selecionar todos os dados na tabela Filme
const selectAllFilme = async () => {

}

// Função para selecionar um dado na tabela Filme pelo ID
const selectByIdFilme = async (id) => {

}

// Função para deletar dados na tabela Filme pelo ID
const deleteFilme = async (id) => {

}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}
