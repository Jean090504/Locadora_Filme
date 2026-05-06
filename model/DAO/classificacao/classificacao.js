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



module.exports = {
    insertClassificacao
}