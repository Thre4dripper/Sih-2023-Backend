import { Socket } from 'socket.io'
import { SocketEvents } from './SocketEvents'

export const rooms: any = {}

class RoomHandler {
    createRoom(socket: Socket, payload: any) {
        const roomId =payload.examId
        socket.join(roomId)
        socket.emit(SocketEvents.ROOM_CREATED, { roomId })
    }

    joinRoom(socket: Socket, payload: any) {
        const { roomId } = payload
        // console.log('Joining room', payload)
        socket.join(roomId)
        socket.rooms.forEach((room: any) => {
            //send to all clients in the room except sender
            if (room !== socket.id) {
                socket.to(room).emit(SocketEvents.JOIN_EXAM_ROOM, { roomId })
            }
        })
    }

    deleteRoom(socket: Socket) {
        console.log('Leaving room', socket.id)
        socket.leave(socket.id)
    }
}

export default new RoomHandler()