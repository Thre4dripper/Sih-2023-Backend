import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { QuestionTypes } from '../enums/QuestionTypes'
import Exam from './exam.model'
import QuestionOption from './question.option.model'

@Table
export default class ExamQuestion extends Model<ExamQuestion> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    question: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string

    @Column({
        type: DataType.ENUM(QuestionTypes.MULTIPLE_CHOICE, QuestionTypes.CODING),
        allowNull: false
    })
    questionType: string

    @ForeignKey(() => Exam)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    examId: number

    @BelongsTo(() => Exam)
    exam: Exam

    @HasMany(() => QuestionOption)
    options: QuestionOption[]
}