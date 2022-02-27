const express = require('express')
const cors = require('cors')

const app = express()
const http = require('http').createServer(app)

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const pingRoutes = require('./api/ping.routes')

app.use('/api', pingRoutes)
app.use('/api/tophosts', pingRoutes)


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030
http.listen(port, () => {
    console.log('Server is running on port: ' + port)
})


