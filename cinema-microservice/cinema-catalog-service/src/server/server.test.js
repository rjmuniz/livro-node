const tape = require('tape')
const server = require('./server')

function apiMock(app, repo) {
    console.log('do nothing')
}

function runTests() {
    tape('Server start', t => {
        server.start(apiMock, null, (err, srv) => {
            t.assert(!err && srv, "Server started")
            t.end()
        })
    })
    tape('Server stop', t => {
        t.assert(server.stop(), "Server stopped")
        t.end()
    })
}

module.exports = { runTests }