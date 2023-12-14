import { SocketEvents } from './socketEvents'
import { Socket } from 'socket.io'
import RoomHandler from './RoomHandler'

class SocketController {
    listener = (socket: Socket) => {
        console.log('A user connected')

        socket.on(SocketEvents.DISCONNECT, () => {
            RoomHandler.deleteRoom(socket)
        })

        socket.on(SocketEvents.CREATE_EXAM_ROOM, (payload: any) => {
            RoomHandler.createRoom(socket, payload)
        })

        socket.on(SocketEvents.JOIN_EXAM_ROOM, (payload: any) => {
            RoomHandler.joinRoom(socket, payload)
        })
    }
}

export default new SocketController()