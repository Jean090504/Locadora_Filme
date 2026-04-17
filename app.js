/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela API do projeto Filmes 
 * Data: 17/04/2026
 * Autor: Jean Costa
 * Versão 1.0
 ********************************************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

// Criação do objeto app
const app = express()

// Permite que o Express entenda JSON no corpo 
app.use(express.json())

const corsOptions = {
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS", 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true 
}

app.use(cors(corsOptions))
app.use(helmet())

// --- IMPORTAÇÃO DAS ROTAS ---

const filmeRotas = require('./src/routes/filme/routes_filme.js')

app.use('/v1/senai/locadora', filmeRotas)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
})