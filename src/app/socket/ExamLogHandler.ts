import { Socket } from 'socket.io'
import examLogService from '../apis/exams/services/exam.log.service'

class ExamLogHandler {
    async lookedAway(socket: Socket, payload: any) {
        const { examId, studentId, activity } = payload
        await examLogService.lookedAway(examId, studentId, activity)
        await examLogService.fetchExamLogs(examId, studentId)
    }

    async objectDetected(socket: Socket, payload: any) {
        const { examId, studentId, activity } = payload
        await examLogService.objectDetected(examId, studentId, activity)
        await examLogService.fetchExamLogs(examId, studentId)
    }
}

export default new ExamLogHandler()