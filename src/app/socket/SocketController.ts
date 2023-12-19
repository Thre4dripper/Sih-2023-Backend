import { SocketEvents } from './SocketEvents'
import { Socket } from 'socket.io'
import RoomHandler from './RoomHandler'
import ExamLogHandler from './ExamLogHandler'

class SocketController {
    listener = (socket: Socket) => {
        console.log('New Connection')

        socket.on(SocketEvents.DISCONNECT, () => {
            RoomHandler.leaveRoom(socket)
        })

        socket.on(SocketEvents.JOIN_EXAM_ROOM, (payload: any) => {
            RoomHandler.joinRoom(socket, payload)
        })

        socket.on(SocketEvents.LOOKED_AWAY, async (payload: any) => {
            console.log('LOOKED_AWAY')
            await ExamLogHandler.lookedAway(socket, payload)
        })

        socket.on(SocketEvents.OBJECT_DETECTED, async (payload: any) => {
            console.log('OBJECT_DETECTED')
            await ExamLogHandler.objectDetected(socket, payload)
        })
    }
}

export default new SocketController()