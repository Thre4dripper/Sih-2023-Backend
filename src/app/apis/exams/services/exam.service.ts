import { ICreateExam } from '../interfaces'
import examRepository from '../repositories/exam.repository'

class examService {
    async createExam(data: ICreateExam) {
        return await examRepository.create(data)
    }
}

export default new examService()
