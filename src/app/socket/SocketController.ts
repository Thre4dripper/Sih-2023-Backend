import { SocketEvents } from './SocketEvents'
import { Socket } from 'socket.io'
import RoomHandler from './RoomHandler'

class SocketController {
    listener = (socket: Socket) => {
        console.log('New Connection')

        socket.on(SocketEvents.DISCONNECT, () => {
            RoomHandler.leaveRoom(socket)
        })

        socket.on(SocketEvents.JOIN_EXAM_ROOM, (payload: any) => {
            RoomHandler.joinRoom(socket, payload)
        })
    }
}

export default new SocketController()