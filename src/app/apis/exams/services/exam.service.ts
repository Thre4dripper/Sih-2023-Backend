import { ICreateExam } from '../interfaces'
import examRepository from '../repositories/exam.repository'

class examService {
    async createExam(data: ICreateExam) {
        return await examRepository.create(data)
    }

    async getAllExams(data: any) {
        const { limit, offset,organizationId } = data
        const exams = await examRepository.findAll({
            where: {
                organizationId,
            },
            limit: Number(limit),
            offset: Number(offset),
        })

        return exams
    }
}

export default new examService()
