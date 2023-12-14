import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { QuestionTypes } from '../enums/QuestionTypes'
import User from './user.model'
import ExamQuestion from './question.model'
@Table
export default class Exam extends Model<Exam> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    duration: number

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    startTime: Date

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    endTime: Date

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    totalMarks: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    passingMarks: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    totalQuestions: number

    @Column({
        type: DataType.ENUM(...Object.values(QuestionTypes)),
        allowNull: false
    })
    examType: QuestionTypes

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    organizationId: number

    @BelongsTo(() => User)
    user: User

    @HasMany(() => ExamQuestion)
    questions: ExamQuestion[]
}