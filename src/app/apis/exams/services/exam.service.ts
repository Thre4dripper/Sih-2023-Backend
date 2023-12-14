import { ICreateExam } from '../interfaces'
import examRepository from '../repositories/exam.repository'
class examService {
    async createExam(data: ICreateExam) {
        const result = await examRepository.create(data)
        return result
    }
}

export default new examService()
