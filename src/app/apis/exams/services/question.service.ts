import { ICreateQuestion } from '../interfaces'
import ExamQuestionRepository from '../repositories/questions.repository'
import ExamQuestionOptions from '../repositories/questionsOptions.repository'
class QuestionService {
    async createExamQuestions(questiondata: ICreateQuestion, optiondata: any) {
        const question = await ExamQuestionRepository.create(questiondata)

        const { id } = question

        console.log(optiondata)
        for (const option of optiondata.options) {
            console.log(option)
            await ExamQuestionOptions.create({
                option:option.option,
                isCorrect: option.isCorrect,
                questionId: id,
            })
        }
    }
}

export default new QuestionService()
