require('dotenv-safe').load()
const cinemaCatalog = require('./api/cinema-catalog')
const server = require('./server/server')
const repository = require('./repository/repository')


server.start(cinemaCatalog, repository, (err, app) => {
    console.log('http://localhost:' + process.env.PORT + '/cities')
})

