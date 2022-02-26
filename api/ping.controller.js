const pingService = require('./ping.service')

async function onPing(req, res) {
    const { count, host } = req.body
    console.log(`count ${count}, host ${host}`)
    try {
        const pingRes = await pingService.ping(count, host)
        console.log(`ping from server controller ${count} ${host}`)
        res.send(pingRes)
    } catch (error) {
        res.status(500).send({ err: `Failed to ping ${host}` })
    }
}

async function getTopHosts(req, res) {
    console.log('getting hosts')
    try {
        const topHosts = await pingService.getTopHosts()
        console.log(topHosts)
        res.send(topHosts)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    onPing,
    getTopHosts
}