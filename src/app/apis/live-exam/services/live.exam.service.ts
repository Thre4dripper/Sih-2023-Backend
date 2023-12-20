import examLogsRepository from '../../exams/repositories/exam.logs.repository'
import { ExamLogTypes } from '../../../enums/ExamLogTypes'
import liveExamLogRepository from '../repositories/live.exam.log.repository'
import examRepository from '../../exams/repositories/exam.repository'
import { ValidationError } from '../../../handlers/CustomErrorHandler'
import { ErrorMessages } from '../../../enums/ErrorMessages'
import questionsRepository from '../../exams/repositories/questions.repository'
import { IGetLiveExamQuestions, ISubmitExamQues } from '../interfaces'
import examLogService from '../../exams/services/exam.log.service'

class LiveExamService {
    async startExam(data: { examId: number; studentId: number }) {
        const { examId, studentId } = data

        const exam = await examRepository.findOne({
            id: examId,
        })

        if (!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }

        // const currentTime = new Date()
        // const startTime = new Date(exam.startTime)
        //
        // if (currentTime < startTime) {
        //     throw new ValidationError(ErrorMessages.EXAM_NOT_STARTED)
        // }
        //
        // const endTime = new Date(exam.startTime)
        // endTime.setMinutes(endTime.getMinutes() + exam.duration)
        //
        // if (currentTime > endTime) {
        //     throw new ValidationError(ErrorMessages.EXAM_ALREADY_FINISHED)
        // }

        //check for exam-started log
        const examStartedLog = await liveExamLogRepository.find({
            examId,
            studentId,
            logType: ExamLogTypes.ExamStarted,
        })

        if (examStartedLog) {
            throw new ValidationError(ErrorMessages.EXAM_ALREADY_STARTED)
        }

        //check for exam finished log
        const examFinishedLog = await liveExamLogRepository.find({
            examId,
            studentId,
            logType: ExamLogTypes.ExamFinished,
        })

        if (examFinishedLog) {
            throw new ValidationError(ErrorMessages.EXAM_ALREADY_FINISHED)
        }

        return await examLogsRepository.create({
            examId,
            studentId,
            activities: {
                activity: 'Exam Started',
            },
            logType: ExamLogTypes.ExamStarted,
        })
    }

    async finishExam(data: { examId: number; studentId: number }) {
        const { examId, studentId } = data

        const exam = await examRepository.findOne({
            id: examId,
        })

        if (!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }

        // const currentTime = new Date()
        // const startTime = new Date(exam.startTime)
        //
        // if (currentTime < startTime) {
        //     throw new ValidationError(ErrorMessages.EXAM_NOT_STARTED)
        // }
        //
        // const endTime = new Date(exam.startTime)
        // endTime.setMinutes(endTime.getMinutes() + exam.duration)
        //
        // if (currentTime > endTime) {
        //     throw new ValidationError(ErrorMessages.EXAM_ALREADY_FINISHED)
        // }

        //check for exam-started log
        const examStartedLog = await liveExamLogRepository.find({
            examId,
            studentId,
            logType: ExamLogTypes.ExamStarted,
        })

        if (!examStartedLog) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_STARTED)
        }

        //check for exam finished log
        const examFinishedLog = await liveExamLogRepository.find({
            examId,
            studentId,
            logType: ExamLogTypes.ExamFinished,
        })

        if (examFinishedLog) {
            throw new ValidationError(ErrorMessages.EXAM_ALREADY_FINISHED)
        }

        return await examLogsRepository.create({
            examId,
            studentId,
            activities: {
                activity: 'Exam Finished',
            },
            logType: ExamLogTypes.ExamFinished,
        })
    }

    async getQuestions(data: IGetLiveExamQuestions) {
        const { examId, studentId, organizationId } = data

        const exam = await examRepository.findOne({
            id: examId,
        })

        if (!exam) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_FOUND)
        }

        const examStartedLog = await liveExamLogRepository.find({
            examId,
            studentId,
            logType: ExamLogTypes.ExamStarted,
        })

        //exam must be started
        if (!examStartedLog) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_STARTED)
        }

        const examFinishedLog = await liveExamLogRepository.find({
            examId,
            studentId,
            logType: ExamLogTypes.ExamFinished,
        })

        //the exam must not be finished
        if (examFinishedLog) {
            throw new ValidationError(ErrorMessages.EXAM_ALREADY_FINISHED)
        }

        const student = await examRepository.findOne({
            id: examId,
        })

        if (!student) {
            throw new ValidationError(ErrorMessages.STUDENT_NOT_FOUND)
        }

        const questionsResult = await questionsRepository.getAllQuestions(
            examId,
            organizationId,
            exam.totalQuestions,
            0
        )

        const questions = questionsResult.rows.map((question) => {
            return {
                ...question.toJSON(),
                options: question.dataValues.options.map((option) => {
                    return {
                        ...option.toJSON(),
                        isCorrect: false,
                    }
                }),
            }
        })

        const quesFromLog = await liveExamLogRepository.getSubmittedQuestions(examId, studentId)

        if (quesFromLog) {
            const { activities } = quesFromLog.toJSON()
            const { questions: submittedQuestions } = activities

            questions.forEach((question) => {
                const { id } = question

                if (submittedQuestions[id]) {
                    question.options.map((option) => {
                        if (submittedQuestions[id].includes(option.id)) {
                            option.isCorrect = true
                        }
                        return option
                    })
                }
            })
        }

        return questions
    }

    async submitQuestion(data: ISubmitExamQues) {
        const { examId, studentId, questionId, options } = data

        //check exam started log
        const examStartedLog = await liveExamLogRepository.find({
            examId,
            studentId,
            logType: ExamLogTypes.ExamStarted,
        })

        if (!examStartedLog) {
            throw new ValidationError(ErrorMessages.EXAM_NOT_STARTED)
        }

        //check exam finished log
        const examFinishedLog = await liveExamLogRepository.find({
            examId,
            studentId,
            logType: ExamLogTypes.ExamFinished,
        })

        if (examFinishedLog) {
            throw new ValidationError(ErrorMessages.EXAM_ALREADY_FINISHED)
        }

        const existingLog = await examLogsRepository.findOne({
            examId,
            studentId,
            logType: ExamLogTypes.QuestionAnswered,
        })

        if (existingLog) {
            await examLogService.fetchExamLogs(examId, studentId)
            return liveExamLogRepository.updateSubmittedQuestion(existingLog.id, {
                activities: {
                    questions: {
                        ...existingLog.toJSON().activities.questions,
                        [questionId]: options,
                    },
                },
            })
        }

        await examLogService.fetchExamLogs(examId, studentId)
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