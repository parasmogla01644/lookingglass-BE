import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'category', freezeTableName: true })
export class Category extends Model {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;
}
