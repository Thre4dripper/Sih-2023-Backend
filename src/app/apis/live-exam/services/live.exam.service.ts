import { ISubmitExamQues } from '../../exams/interfaces'
import examLogsRepository from '../../exams/repositories/exam.logs.repository'
import { ExamLogTypes } from '../../../enums/ExamLogTypes'
import liveExamLogRepository from '../repositories/live.exam.log.repository'
import examRepository from '../../exams/repositories/exam.repository'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'

class LiveExamService {
    async startExam(data: { examId: number; studentId: number }) {
        const { examId, studentId } = data

        const exam = await examRepository.findOne({
            where: {
                id: examId,
            },
        })

        const examLogData = await liveExamLogRepository.find({
            examId,
            studentId,
            logType: ExamLogTypes.ExamStarted,
        })

        if (examLogData) {
            throw new ValidationError(ErrorMessages.EXAM_ALREADY_STARTED)
        }

        if (!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }

        if (exam.startTime > new Date()) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_STARTED)
        }

        const examLog = await examLogsRepository.create({
            examId,
            studentId,
            activities: {
                activity: 'Exam Started',
            },
            logType: ExamLogTypes.ExamStarted,
        })

        if (!examLog) {
            throw new ValidationError('Something went wrong')
        }

        return examLog
    }

    async finishExam(data: { examId: number; studentId: number }) {
        const { examId, studentId } = data

        const exam = await examRepository.findOne({
            where: {
                id: examId,
            },
        })

        const examLogData = await liveExamLogRepository.find({
            examId,
            studentId,
            logType: ExamLogTypes.ExamFinished,
        })

        if (examLogData) {
            throw new ValidationError(ErrorMessages.EXAM_ALREADY_FINISHED)
        }

        if (!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }

        if (exam.startTime > new Date()) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_STARTED)
        }

        const examLog = await examLogsRepository.create({
            examId,
            studentId,
            activities: {
                activity: 'Exam Finished',
            },
            logType: ExamLogTypes.ExamFinished,
        })

        if (!examLog) {
            throw new ValidationError('Something went wrong')
        }

        return examLog
    }

    async submitQuestion(data: ISubmitExamQues) {
        const { examId, studentId, questionId, options } = data

        const existingLog = await examLogsRepository.findOne({
            examId,
            studentId,
            logType: ExamLogTypes.QuestionAnswered,
        })

        if (existingLog) {
            return liveExamLogRepository.updateSubmittedQuestion(existingLog.id, {
                activities: {
                    questions: {
                        [questionId]: options,
                    },
                },
            })
        }

        return liveExamLogRepository.submitQuestion({
            examId,
            studentId,
            logType: ExamLogTypes.QuestionAnswered,
            activities: {
                questions: {
                    [questionId]: options,
                },
            },
        })
    }
}

export default new LiveExamService()