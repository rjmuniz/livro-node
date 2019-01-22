const tape = require('tape')
const mongodb = require('./mongodb')


function runTests() {
    tape('MongoDB Connection', t => {
        mongodb.connect((err, conn) => {
            t.assert(conn, 'Connection established')
            t.end()
        })
    })

    tape('MongoDB Disconnection', t => {
        t.assert(mongodb.disconnect(), 'Disconnected')
        t.end()
    })
}

module.exports = { runTests }