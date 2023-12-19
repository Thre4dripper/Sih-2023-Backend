import { Socket } from 'socket.io'
import examLogService from '../apis/exams/services/exam.log.service'

class ExamLogHandler {
    async lookedAway(socket: Socket, payload: any) {
        const { examId, studentId, activity } = payload
        await examLogService.lookedAway(examId, studentId, activity)
    }

    async objectDetected(socket: Socket, payload: any) {
        const { examId, studentId, activity } = payload
        await examLogService.objectDetected(examId, studentId, activity)
    }
}

export default new ExamLogHandler()