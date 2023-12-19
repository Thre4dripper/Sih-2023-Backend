import examLogsRepository from '../repositories/exam.logs.repository'
import { ExamLogTypes } from '../../../enums/ExamLogTypes'
import examRepository from '../repositories/exam.repository'
const { GoogleGenerativeAI } = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI('AIzaSyAutft5LTDzCI96XHP3grWj6XJ___drasc')

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

    async fetchExamLogs(examId: number, studentId: number) {
        const logs = await examLogsRepository.findOne({
            examId,
            studentId,
            logType: ExamLogTypes.ExamLogLLM,
        })

        if (!logs) {
            const examStartTime = await examRepository.findOne({
                where: {
                    id: examId,
                },
            })

            const time = new Date(examStartTime.startTime)
            time.setMinutes(time.getMinutes() + 15)
            console.log('time', time)

            const initialLogs = await examLogsRepository.findAll({
                examId,
                studentId,
            })

            const model = genAI.getGenerativeModel({ model: 'gemini-pro', maxTokens: 500 })

            let prompt = JSON.stringify(
                initialLogs.map((log) => {
                    return {
                        logType: log.logType,
                        activities: log.activities,
                    }
                })
            )

            prompt += `analyze the students' activities and generate a report on the students' activities. 
                   only summarize the activity of the students. based on the activities logs provide in short
                    `

            const result = await model.generateContent(prompt)
            const response = await result.response
            const llmData = response.text()

            const data = await examLogsRepository.create({
                examId,
                studentId,
                logType: ExamLogTypes.ExamLogLLM,
                activities: {
                    activities: [
                        {
                            activity: llmData,
                            timeStamp: new Date(),
                        },
                    ],
                },
            })
            return data
        } else {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro', maxTokens: 500 })

            const nextTime = logs?.updatedAt

            nextTime.setMinutes(nextTime.getMinutes() + 15)

            const newLogs = await examLogsRepository.findAll({
                examId,
                studentId,
            })

            let prompt = JSON.stringify(
                newLogs.map((log) => {
                    return {
                        logType: log.logType,
                        activities: log.activities,
                    }
                })
            )

            prompt += `analyze the students' activities and generate a report on the students' activities. 
                   only summarize the activity of the students. based on the activities logs provide in short
                    `

            const result = await model.generateContent(prompt)
            const response = await result.response
            const llmData = response.text()

            const data = await examLogsRepository.update(logs.id, {
                activities: {
                    activities: [
                        ...logs.activities.activities,
                        {
                            activity: llmData,
                            timeStamp: new Date(),
                        },
                    ],
                },
            })

            return data
        }
    }
}

export default new ExamLogService()
