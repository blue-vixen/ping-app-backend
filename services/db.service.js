const MongoClient = require('mongodb').MongoClient
const dbName = 'pingHistoryDB'
const uri = "mongodb+srv://pingapp:gh1LIQvQKIE5Pao4@cluster0.jysjk.mongodb.net/pingHistoryDB?retryWrites=true&w=majority";
var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (error) {
        console.log('Failed to get Mongo collection', error)
        throw error
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}

module.exports = {
    getCollection
}
