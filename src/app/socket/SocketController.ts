import { IExamRoom } from './interfaces'
import { SocketEvents } from '../enums/socketEvents'
import { Socket } from 'socket.io'

class SocketController {
    rooms: IExamRoom[] = []

    listener = (socket: Socket) => {
        console.log('A user connected')
        this.rooms.push({
            socketId: socket.id,
            organizationId: 1,
            examId: 1
        })

        console.log(this.rooms)

        socket.on(SocketEvents.DISCONNECT, () => {
            console.log('A user disconnected')
            this.rooms = this.rooms.filter((room) => room.socketId !== socket.id)
        })

        // Add other socket event listeners here as needed
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg)
        })
    }
}

export default new SocketController()