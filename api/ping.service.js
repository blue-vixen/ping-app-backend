const dbService = require('../services/db.service')
const util = require('util')
const { ObjectId } = require('mongodb')
const exec = util.promisify(require('child_process').exec)

const ping = async (count, host) => {
    console.log(`ping from server service ${count} ${host}`)
    const { stdout, stderr } = await exec(`ping -n ${count} ${host}`)
    const updatedHost = updateHistory(stdout || stderr, count, host)
    console.log('here')
    return updatedHost
    // return stdout || stderr
}

const updateHistory = async (result, count, hostToFind) => {
    try {
        const collection = await dbService.getCollection('history')
        const host = await collection.findOne({ 'host': hostToFind })
        return (!host) ? addHost(result, +count, hostToFind) : updateHost(result, +count, host)
    } catch (error) {
        console.log(error)
        throw error
    }
}

const addHost = async (result, count, host) => {
    console.log('adding')
    const hostToAdd = {
        host,
        pingCount: count,
        requests: [result]
    }
    const collection = await dbService.getCollection('history')
    const newId = await collection.insertOne(hostToAdd)
    hostToAdd._id = newId.insertedId.toString()
    return hostToAdd
}

const updateHost = async (result, count, hostToUpdate) => {
    console.log('updating')
    hostToUpdate.pingCount += count
    hostToUpdate.requests.push(result)
    const collection = await dbService.getCollection('history')
    await collection.updateOne({ "_id": hostToUpdate._id }, { $set: { ...hostToUpdate } })
    return hostToUpdate
    // try {
    //     const hostToSave = host
    //     hostToSave._id = ObjectId(host._id)
    //     const collection = await dbService.getCollection('history')
    //     await collection.updateOne({ _id: hostToSave._id }, { $set: hostToSave })
    //     return hostToSave

    // } catch (error) {
    //     console.log(error)
    //     throw error
    // }
}

const getHosts = async () => {
    const collection = await dbService.getCollection('history')
    // const topHosts = await collection.aggregate(
    //     [
    //         { $sort: { 'pingCount': -1 } },
    //         { $limit: 5 }
    //     ]
    // ).toArray()
    // return topHosts
    const hosts = await collection.find().toArray()
    return hosts
}

module.exports = {
    ping,
    getHosts
}