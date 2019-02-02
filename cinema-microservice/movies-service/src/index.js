require('dotenv-safe').load()

const server = require('./server/server')
const repository = require('./repository/repository')
const api = require('./api/movies')


server.start(api, repository, (err, srv) => {
    console.log('iniciado porta ' + process.env.PORT)
})