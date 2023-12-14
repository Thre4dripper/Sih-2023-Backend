import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript'
import { Roles } from '../enums/Roles'
import Exam from './exam.model'

@Table
export default class User extends Model<User> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        unique: 'organizationId_email_role',
        allowNull: true,
    })
    organizationId: number

    @Column({
        type: DataType.STRING(128),
        allowNull: false,
    })
    name: string

    @Column({
        type: DataType.STRING,
        unique: 'organizationId_email_role',
        allowNull: false,
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    phone: string

    @Column({
        type: DataType.ENUM(...Object.values(Roles)),
        unique: 'organizationId_email_role',
        allowNull: false,
    })
    role: Roles

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    profilePic: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    address: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    city: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    state: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    country: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    zipCode: string

    @BelongsTo(() => User)
    organization: User

    @HasMany(() => User)
    users: User[]

    @HasMany(() => Exam)
    exams: Exam[]
}