import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import Exam from './exam.model'
import User from './user.model'
import { ExamLogTypes } from '../enums/ExamLogTypes'

@Table
export default class ExamLog extends Model<ExamLog> {
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

    @Column({
        type: DataType.ENUM(...Object.values(ExamLogTypes)),
        allowNull: false,
    })
    logType: ExamLogTypes

    @Column({
        type: DataType.JSON,
        allowNull: true,
        defaultValue: {}
    })
    activities: any

    @BelongsTo(() => Exam)
    exam: Exam

    @BelongsTo(() => User)
    student: User
}