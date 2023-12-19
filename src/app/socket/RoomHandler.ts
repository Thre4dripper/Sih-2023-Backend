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
            const proctors = rooms[payload.roomId].filter((item) => item.type === Roles.PROCTOR)
            const proctorIds = proctors.map((item) => item.socketId)

            //send all proctors to the new student
            socket.to(socket.id).emit(SocketEvents.NEW_STUDENT_JOINED, proctors)
            //send the new student to all proctors
            socket.to(proctorIds).emit(SocketEvents.NEW_STUDENT_JOINED, [streamData])
        } else {
            const students = rooms[payload.roomId].filter((item) => item.type === Roles.STUDENT)
            const studentIds = students.map((item) => item.socketId)

            //send all students to the new proctor
            socket.to(socket.id).emit(SocketEvents.NEW_PROCTOR_JOINED, students)
            //send the new proctor to all students
            socket.to(studentIds).emit(SocketEvents.NEW_PROCTOR_JOINED, [streamData])
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
    }
}

export default new RoomHandler()