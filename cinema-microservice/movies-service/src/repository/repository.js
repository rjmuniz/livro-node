const mongodb = require('../config/mongodb')
const collectionName = 'movies'


function getAllMovies(callback) {
    mongodb.connect((err, db) => {
        db
            .collection(collectionName)
            .find()
            .toArray(callback)
    })
}

function getMovieById(id, callback) {
    mongodb.connect((err, db) => {
        db
            .collection(collectionName)
            .findOne({ _id: require('mongodb').ObjectId(id) }, callback)
    })
}

function getMoviePremiers(callback) {
    var monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 2)
    monthAgo.setHours(0, 0, 0)
    monthAgo.setMilliseconds(0)

    mongodb.connect((err, db) => {
        db
            .collection(collectionName)
            .find({ dataLancamento: { $gte: monthAgo } })
            .toArray(callback)
    })
}

function disconnect() {
    return mongodb.disconnect()
}

module.exports = { getAllMovies, getMovieById, getMoviePremiers, disconnect }