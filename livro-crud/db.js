const mongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId
mongoClient
    .connect("mongodb+srv://admin:admin@cluster0-vjw3e.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })
    .then(conn => global.conn = conn.db("workshop"))
    .catch(err => console.error(err));

function findAll(callback) {
    global.conn.collection("customers").find({}).toArray(callback)
}

function findOne(id, callback) {
    global.conn.collection("customers").findOne(new ObjectId(id), callback)
}

function insert(customer, callback) {
    global.conn.collection("customers").insert(customer, callback)
}
function update(id, customer, callback) {
    global.conn.collection("customers").update({ _id: new ObjectId(id) }, customer, { upsert: true }, callback)
}

module.exports = { findAll, findOne, insert, update }
