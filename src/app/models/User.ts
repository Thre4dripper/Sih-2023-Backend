import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Roles } from '../enums/Roles'

@Table
export default class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        unique: 'id_email_role',
        allowNull: false,
    })
    id: number

    @Column({
        type: DataType.STRING(128),
        allowNull: false,
    })
    name: string

    @Column({
        type: DataType.STRING,
        unique: 'id_email_role',
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
        unique: 'id_email_role',
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
}