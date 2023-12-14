import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import Exam from './exam.model'
import User from './user.model'
import ExamQuestion from './question.model'
import QuestionOption from './question.option.model'

@Table
export default class ExamResponse extends Model<ExamResponse> {
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

    @ForeignKey(()=>ExamQuestion)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    questionId: number

    @ForeignKey(()=>QuestionOption)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    optionId: number

    @BelongsTo(() => Exam)
    exam: Exam

    @BelongsTo(() => User)
    student: User

    @BelongsTo(()=>ExamQuestion)
    question: ExamQuestion

    @BelongsTo(()=>QuestionOption)
    option: QuestionOption
}