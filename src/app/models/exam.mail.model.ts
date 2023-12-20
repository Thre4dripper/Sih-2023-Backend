import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import Exam from './exam.model'
import User from './user.model'

@Table
export default class ExamMail extends Model<ExamMail> {
    @ForeignKey(() => Exam)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    examId: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    studentId: number

    // @ForeignKey(() => User)
    // @Column({
    //     type: DataType.INTEGER,
    //     allowNull: false,
    // })
    // organizationId: number

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isMailSent: boolean

    @BelongsTo(() => Exam)
    exam: Exam

    @BelongsTo(() => User)
    student: User
}
