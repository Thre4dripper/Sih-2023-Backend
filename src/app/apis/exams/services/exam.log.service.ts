import examLogsRepository from '../repositories/exam.logs.repository'
import { ExamLogTypes } from '../../../enums/ExamLogTypes'

class ExamLogService {
    async lookedAway(examId: number, student: number, lookAway: string) {
        return examLogsRepository.create({
            examId,
            student,
            logType: ExamLogTypes.LookedAway,
            activities: {
                activity: lookAway,
                timeStamp: new Date(),
            },
        })
    }

    async objectDetected(examId: number, student: number, object: string) {
        return examLogsRepository.create({
            examId,
            student,
            logType: ExamLogTypes.ObjectDetected,
            activities: {
                activity: object,
                timeStamp: new Date(),
            },
        })
    }
}

export default new ExamLogService()