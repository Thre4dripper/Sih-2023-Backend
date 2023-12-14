import { Socket } from 'socket.io'
import { v4 as uuid } from 'uuid'
import { SocketEvents } from './socketEvents'

export const rooms: any = {}

class RoomHandler {
    createRoom(socket: Socket, payload: any) {
        const roomId = uuid()
        socket.join(roomId)
        socket.emit(SocketEvents.ROOM_CREATED, { roomId })
    }

    joinRoom(socket: Socket, payload: any) {
        const { roomId } = payload
        console.log('Joining room', roomId)
        socket.join(roomId)
    }

    deleteRoom(socket: Socket) {
        console.log('Leaving room', socket.id)
        socket.leave(socket.id)
    }
}

export default new RoomHandler()