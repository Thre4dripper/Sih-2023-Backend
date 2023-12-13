import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table
export default class User extends Model<User> {
    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    name: string;
}