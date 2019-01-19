const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

MongoClient
    .connect("mongodb+srv://admin:admin@cluster0-vjw3e.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })
    .then(conn => global.conn = conn.db('workshop'))
    .catch(err => console.error(err))

var collection = () => global.conn.collection('customers')

function findCustomers(callback) {
    collection().find().toArray(callback)
}
function findOne(id, callback) {
    collection().findOne({ _id: new ObjectId(id) }, callback)
}
function insert(customer, callback) {
    collection().insert(customer, callback)
}
function update(id, customer, callback) {
    collection().update({ _id: new ObjectId(id) }, customer, callback)
}
function updatePatch(id, customer, callback) {
    collection().update({ _id: new ObjectId(id) }, { $set: customer}, callback)
}
function deleteOne(id, callback) {
    collection().deleteOne({ _id: new ObjectId(id) }, callback)
}
module.exports = { findCustomers, findOne, insert, update, updatePatch, deleteOne }