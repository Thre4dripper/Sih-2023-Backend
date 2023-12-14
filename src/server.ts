import http from 'http'
import socketConfig from './config/socketConfig'
import serverConfig from './config/expressConfig'
import { SocketEvents } from './app/enums/socketEvents' // Assuming you have your server configuration in this file

const port = process.env.PORT || 3000
;(async () => {
    const app = await serverConfig()

    // Create an HTTP server instance
    const httpServer = http.createServer(app)

    // Integrate Socket.IO with the HTTP server
    const io = socketConfig(httpServer)

    io.on(SocketEvents.CONNECTION, (socket) => {
        console.log('A user connected')

        socket.on(SocketEvents.DISCONNECT, () => {
            console.log('A user disconnected')
        })

        // Add other socket event listeners here as needed
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg)
        })
    })

    // Start listening for HTTP requests
    httpServer.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
})()