import examLogsRepository from '../repositories/exam.logs.repository'
import { ExamLogTypes } from '../../../enums/ExamLogTypes'

class ExamLogService {
    async lookedAway(examId: number, studentId: number, activity: string) {
        const existingLog = await examLogsRepository.findOne({
            examId,
            studentId,
            logType: ExamLogTypes.LookedAway,
        })

        if (existingLog?.activities?.activities.length >= 20) {
            return
        }

        if (existingLog) {
            return examLogsRepository.update(existingLog.id, {
                activities: {
                    activities: [
                        ...existingLog.activities.activities,
                        {
                            activity,
                            timeStamp: new Date(),
                        },
                    ],
                },
            })
        }

        return examLogsRepository.create({
            examId,
            studentId,
            logType: ExamLogTypes.LookedAway,
            activities: {
                activities: [
                    {
                        activity,
                        timeStamp: new Date(),
                    },
                ],
            },
        })
    }

    async objectDetected(examId: number, studentId: number, activity: string) {
        const existingLog = await examLogsRepository.findOne({
            examId,
            studentId,
            logType: ExamLogTypes.ObjectDetected,
        })

        if (existingLog?.activities?.activities.length >= 20) {
            return
        }

        if (existingLog) {
            return examLogsRepository.update(existingLog.id, {
                activities: {
                    activities: [
                        ...existingLog.activities.activities,
                        {
                            activity,
                            timeStamp: new Date(),
                        },
                    ],
                },
            })
        }

        return examLogsRepository.create({
            examId,
            studentId,
            logType: ExamLogTypes.ObjectDetected,
            activities: {
                activities: [
                    {
                        activity,
                        timeStamp: new Date(),
                    },
                ],
            },
        })
    }
}

export default new ExamLogService()