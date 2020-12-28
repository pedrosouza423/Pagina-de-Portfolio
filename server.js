//Importando express e nunjucks
const express = require('express')
const nunjucks = require('nunjucks')

//Criando a o server e atribuindo-lhe o express
const server = express()

//Importando dados que foram criados
const videos = require('./data')

//Parte estática da página
server.use(express.static('public'))

//Setando o view engina
server.set("view engine", "njk")

//Configuração Nunjucks
nunjucks.configure("views", {
    express:server
})

//Criando rota get para o servidor
server.get("/", function(req, res){
    return res.render('about')
})

server.get("/portfolio", function(req, res){
    return res.render('portfolio', {items: videos})
})

//Rodar o servidor
server.listen(5000, function() {
    console.log('server is running')
})