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

async function getHosts(req, res) {
    console.log('getting hosts')
    try {
        const hosts = await pingService.getHosts()
        res.send(hosts)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    onPing,
    getHosts
}