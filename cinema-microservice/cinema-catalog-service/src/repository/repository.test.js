const tape = require('tape')
const repository = require('./repository')

function runTests() {
    var cityId = null
    var cinemaId = null
    var movieId = null

    tape('Repository getAllCities', t => {
        repository.getAllCities((err, cities) => {
            if (cities && cities.length > 0)
                cityId = cities[0]._id

            t.assert(!err && cities && cities.length > 0, 'All Cities Returned')
            t.end()
        })
    })

    tape('Repository getCinemasByCityId', t => {
        repository.getCinemasByCityId(cityId, (err, cinemas) => {
            if (cinemas && cinemas.length > 0)
                cinemaId = cinemas[0]._id

            t.assert(!err && cinemas && cinemas.length > 0, 'All Cinemas Returned')
            t.end()
        })
    })
    tape('Repository getMoviesByCinemaId', t => {
        repository.getMoviesByCinemaId(cinemaId, (err, movies) => {
            t.assert(!err && movies && movies.length > 0, 'All Movies Returned')
            t.end()
        })
    })
    tape('Repository getMoviesByCityId', t => {
        repository.getMoviesByCityId(cityId, (err, movies) => {
            if (movies && movies.length > 0)
                movieId = movies[0].idFilme

            t.assert(!err && movies && movies.length > 0, 'Movies By dityId eturned')
            t.end()
        })
    })
    
  
    tape('Repository getMovieSessionByCityId', t => {
        repository.getMovieSessionsByCityId(movieId, cityId, (err, session) => {         

            t.assert(!err && session && session.length > 0, 'session Movie By cityId Returned. Params: '+movieId + ', '+cityId)
            t.end()
        })
    })
    tape('Repository getMovieSessionsByCinemaId', t => {
        repository.getMovieSessionsByCinemaId(movieId, cinemaId, (err, session) => {
            if (session && session.length > 0)
            cinemaId = session[0]._id

            t.assert(!err && session && session.length > 0, 'session Movie By cinemaId Returned')
            t.end()
        })
    })

    tape('Repository disconnection', t => {
        t.assert(repository.disconnect(), 'Disonnection')
        t.end()
    })
}

module.exports = { runTests }