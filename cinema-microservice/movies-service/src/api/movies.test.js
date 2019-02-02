const tape = require('tape')
const supertest = require('supertest')
const movies = require('./movies')
const server = require('../server/server')
const repository = require('../repository/repository')

function apiMock(app, repo) {
    console.log('do nothing')
}

function runTests() {
    var app = null
    server.start(movies, repository, (err, app) => {
        var id = null
        tape('GET /movies', t => {
            supertest(app)
                .get('/movies')
                .expect('Content-Type', /json/)
                .expect(200)
                    .end((err, res) => {
                        if (res.body && res.body.length > 0)
                            id = res.body[0]._id
                        t.error(err, 'No Errors')
                        t.assert(res.body && res.body.length > 0, 'All Movies returned')
                        t.end()
                    })

        })

        tape('GET /movies/:id', t => {
            supertest(app)
                .get('/movies/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                    .end((err, res) => {
                        t.assert(res.body, 'Movie returned')
                        t.end()
                    })

        })

        tape('GET /movies/premiers', t => {
            supertest(app)
                .get('/movies/premiers')
                .expect('Content-Type', /json/)
                .expect(200)
                    .end((err, res) => {
                        if (res.body && res.body.length > 0)
                            id = res.body[0]._id
                        t.error(err, 'No Errors')
                        t.assert(res.body && res.body.length > 0, 'Premiers Movies returned')
                        t.end()
                    })

        })

        server.stop();
    })
}

module.exports = { runTests }