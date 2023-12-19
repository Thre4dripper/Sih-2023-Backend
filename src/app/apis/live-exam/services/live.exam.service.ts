import { ISubmitExamQues } from '../../exams/interfaces'
import examLogsRepository from '../../exams/repositories/exam.logs.repository'
import { ExamLogTypes } from '../../../enums/ExamLogTypes'

class LiveExamService {
    async submitQuestion(data: ISubmitExamQues) {
        const { examId, studentId, questionId, options } = data

        const existingLog = await examLogsRepository.findOne({
            examId,
            studentId,
            logType: ExamLogTypes.QuestionAnswered,
        })

        if (existingLog) {
            return examLogsRepository.update(existingLog.id, {
                activities: {
                    questions: [
                        ...existingLog.activities.questions,
                        {
                            questionId,
                            options,
                        },
                    ],
                },
            })
        }

        return examLogsRepository.create({
            examId,
            studentId,
            logType: ExamLogTypes.QuestionAnswered,
            activities: {
                questions: [
                    {
                        questionId,
                        options,
                    },
                ],
            },
        })
    }
}

export default new LiveExamService()