const tape = require('tape')
const supertest = require('supertest')
const movies = require('./cinema-catalog')
const server = require('../server/server')
const repository = require('..//repository/repository')


function runTests() {
    var app = null

    server.start(movies, repository, (err, app) => {
        var cityId = null
        var movieId = null
        var cinemaId = null

        tape('GET /cities', t => {
            supertest(app)
                .get('/cities')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res.body && res.body.length > 0)
                        cityId = res.body[0]._id
                    t.error(err, 'No Errors')
                    t.assert(res.body && res.body.length > 0, 'All cities returned')
                    t.end()
                })
        })

        tape('GET /cities/:city/movies', t => {
            supertest(app)
                .get('/cities/' + cityId + '/movies')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res.body && res.body.length > 0)
                        movieId = res.body[0].idFilme
                    t.error(err, 'No Errors')
                    t.assert(res.body && res.body.length > 0, 'Movies By City Id returned. Params: '+cityId)
                    t.end()
                })

        })

        tape('GET /cities/:city/movies/:movie', t => {
            supertest(app)
                .get('/cities/' + cityId + '/movies/' + movieId)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res.body && res.body.length > 0)
                        cinemaId = res.body[0].idCinema
                    t.error(err, 'No Errors')
                    t.assert(res.body && res.body.length > 0, 'Movie Sesions by City Id Returned. Params: '+cityId + ', '+movieId)
                    t.end()
                })
        })

        tape('GET /cities/:city/cinemas', t => {
            supertest(app)
                .get('/cities/' + cityId + '/cinemas')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    t.error(err, 'No Errors')
                    t.assert(res.body && res.body.length > 0, 'Cinemas by City Id returned. Params: '+cityId)
                    t.end()
                })
        })

        tape('GET /cinemas/:cinema/movies', t => {
            supertest(app)
                .get('/cinemas/' + cinemaId + '/movies')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    t.error(err, 'No Errors')
                    t.assert(res.body && res.body.length > 0, 'Movies By Cinema Id returned. Params: '+cinemaId)
                    t.end()
                })
        })

        tape('GET /cinemas/:cinema/movies/:movie', t => {
            supertest(app)
                .get('/cinemas/' + cinemaId + '/movies/' + movieId)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    t.error(err, 'No Errors')
                    t.assert(res.body && res.body.length > 0, 'Movies Sessions By Cinema Id returned. Params: '+cinemaId+','+ movieId)
                    t.end()
                })
        })
       
    })

    
    repository.disconnect()
    server.stop()
}

module.exports = { runTests }