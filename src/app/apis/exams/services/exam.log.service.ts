import examLogsRepository from '../repositories/exam.logs.repository'
import { ExamLogTypes } from '../../../enums/ExamLogTypes'

class ExamLogService {
    async lookedAway(examId: number, studentId: number, activity: string) {
        return examLogsRepository.create({
            examId,
            studentId,
            logType: ExamLogTypes.LookedAway,
            activities: {
                activity,
                timeStamp: new Date(),
            },
        })
    }

    async objectDetected(examId: number, studentId: number, activity: string) {
        return examLogsRepository.create({
            examId,
            studentId,
            logType: ExamLogTypes.ObjectDetected,
            activities: {
                activity,
                timeStamp: new Date(),
            },
        })
    }
}

export default new ExamLogService()