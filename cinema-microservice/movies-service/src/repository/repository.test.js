const tape = require('tape')
const repository = require('./repository')


function runTests() {
    var id = null

    tape('Repository getAllMovies', (t) => {
        repository.getAllMovies((err, movies) => {
            if (movies && movies.length > 0)
                id = movies[0]._id

            t.assert(!err && movies && movies.length > 0, "All Movies Returned")
            t.end()
        })
    })

    tape('Repository GetMovieById', (t) => {
        if (!id) {
            t.assert(false, 'Movie by Id Returned')
            t.end()
            return
        }

        repository.getMovieById(id, (err, movies) => {
            t.assert(!err && movies, "Movie by Id Returned")
            t.end()
        })
    })

    tape('Repository getMoviePremiers', (t) => {
        repository.getMoviePremiers((err, movies) => {
            t.assert(!err && movies && movies.length > 0, "Movie Premiers Returned")
            t.end()
        })
    })

    tape('Repository Disconnection', t => {
        t.assert(repository.disconnect(), 'Disconnected')
        t.end()
    })
}

module.exports = { runTests }