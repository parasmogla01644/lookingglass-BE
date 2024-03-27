import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'closet', freezeTableName: true })
export class Closet extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  })
  id: string;

  @Column({ allowNull: false })
  category: string;

  @Column({ allowNull: false })
  brand: string;

  @Column({ allowNull: false })
  color: string;

  @Column({ allowNull: false })
  season: string;

  @Column({ allowNull: false })
  type: string;

  @Column({ allowNull: false })
  url: string;
}
