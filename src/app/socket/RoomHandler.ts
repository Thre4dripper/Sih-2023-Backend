import { Socket } from 'socket.io'
import { SocketEvents } from './SocketEvents'
import { Roles } from '../enums/Roles'

interface IPayload {
    peerId: string
    roomId: string
    type: Roles.STUDENT | Roles.PROCTOR
}

interface IRoom extends IPayload {
    socketId: string
}

interface IGlobal {
    [key: string]: IRoom[]
}

export const rooms: IGlobal = {}

class RoomHandler {
    joinRoom(socket: Socket, payload: IPayload) {
        console.log('Joining room', payload.roomId)

        const { roomId, peerId, type } = payload
        socket.join(roomId)

        const streamData: IRoom = {
            peerId,
            roomId,
            socketId: socket.id,
            type,
        }
        //if a room already exists, add the peerId to the room
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

        if (type === Roles.STUDENT) {
            socket.emit(SocketEvents.NEW_STUDENT_JOINED, {
                room: rooms[payload.roomId],
            })
        } else {
            socket.emit(SocketEvents.NEW_PROCTOR_JOINED, {
                room: rooms[payload.roomId],
            })
        }
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

        console.log('Rooms', rooms)
    }
}

export default new RoomHandler()