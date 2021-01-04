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
    express:server,
    autoescape:false,
    noCache:true
})

//Criando rota get para o servidor
server.get("/", function(req, res){
    const about = {
        avatar_url: 'https://avatars1.githubusercontent.com/u/62824231?s=400&u=272b848fa2105baa1587c5fc571f2294c2a74445&v=4',
        name:'Pedro Souza',
        role:'Engenheiro de Software',
        description:'<a href="https://github.com/pedrosouza423" target="_blank">Programador Full-Stack</a> focado em sempre melhorar as habilidades.',
        links: [
            {name: 'Github', url:'https://github.com/pedrosouza423'},
            {name: 'Instagram', url:'"https://www.instagram.com/pedro.souza423/'},
            {name: 'LinkedIn', url:'https://www.linkedin.com/in/pedrohfsouza/'}

        ]
    }

    return res.render('about', {about})
})

server.get('/portfolio', function(req, res){
    return res.render('portfolio', {items: videos})
})

//Página de video
server.get('/video', function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        if(video.id == id){
            return true
        }
    })

    if(!video){
        return res.send('Video not found')
    }

    return res.render('video',{item: video})
})

//Rodar o servidor
server.listen(5000, function() {
    console.log('server is running')
})