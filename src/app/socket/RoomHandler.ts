import { Socket } from 'socket.io'
import { SocketEvents } from './SocketEvents'

interface IPayload {
    roomId: string
    peerId: string
    socketId: string
    type: 'STUDENT' | 'PROCTOR'
}

interface IRoom {
    [key: string]: IPayload[]
}

export const rooms: IRoom = {}

class RoomHandler {
    joinRoom(socket: Socket, payload: IPayload) {
        console.log('Joining room', payload.roomId)
        socket.join(payload.roomId)

        const streamData: IPayload = {
            peerId: payload.peerId,
            socketId: socket.id,
            type: 'STUDENT',
            roomId: payload.roomId,
        }

        if (rooms[payload.roomId]) {
            const oldRoom = rooms[payload.roomId]
            //if peerId already exists, don't add it again
            if (oldRoom.find((item) => item.peerId === payload.peerId)) {
                return
            }
            rooms[payload.roomId] = [streamData, ...oldRoom]
        } else {
            rooms[payload.roomId] = [streamData]
        }
        socket.to(payload.roomId).emit(SocketEvents.JOINED_EXAM_ROOM, rooms[payload.roomId])
        console.log('Rooms', rooms)
    }

    leaveRoom(socket: Socket) {
        const roomId = Object.keys(rooms).find((roomId) => {
            return rooms[roomId].find((item) => item.socketId === socket.id)?.roomId
        })
        if (!roomId) return
        console.log('Leaving room', roomId)
        socket.leave(roomId)
        const updatedRoom = rooms[roomId].filter((item) => item.socketId !== socket.id)

        if (updatedRoom.length === 0) {
            console.log('Deleting room', roomId)
            delete rooms[roomId]
        } else {
            rooms[roomId] = updatedRoom
            const leftPeerId = rooms[roomId].find((item) => item.socketId === socket.id)?.peerId
            socket
                .to(roomId)
                .emit(SocketEvents.LEAVE_EXAM_ROOM, { leftPeerId, rooms: rooms[roomId] })
        }
    }

    clearRooms() {
        Object.keys(rooms).forEach((roomId) => {
            delete rooms[roomId]
        })
    }
}

export default new RoomHandler()