import User from '../../../models/user.model'
import ExamMail from '../../../models/exam.mail.model'

class MailRepository {
    async create(data: any) {
        return ExamMail.create(data)
    }

    async findAll(data: any) {
        const { examId, limit, offset } = data
        return ExamMail.findAll({
            where: {
                examId,
            },
            include: [
                {
                    model: User,
                    as: 'student',
                },
            ],
            limit,
            offset,
        })
    }
}

export default new MailRepository()
