import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import ExamQuestion from './question.model'
import ExamResponse from './exam.response.model'

@Table
export default class QuestionOption extends Model<QuestionOption> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    option: string

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isCorrect: boolean

    @ForeignKey(() => ExamQuestion)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    questionId: number

    @BelongsTo(() => ExamQuestion)
    question: ExamQuestion

    @HasMany(()=>ExamResponse)
    responses: ExamResponse[]
}