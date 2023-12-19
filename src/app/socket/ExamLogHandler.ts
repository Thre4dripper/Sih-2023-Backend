import { Socket } from 'socket.io'
import examLogService from '../apis/exams/services/exam.log.service'

class ExamLogHandler {
    async lookedAway(socket: Socket, payload: any) {
        const { examId, student, lookAway } = payload
        await examLogService.lookedAway(examId, student, lookAway)
    }

    async objectDetected(socket: Socket, payload: any) {
        const { examId, student, object } = payload
        await examLogService.objectDetected(examId, student, object)
    }
}

export default new ExamLogHandler()