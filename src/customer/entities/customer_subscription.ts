import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'customer_subscription', freezeTableName: true })
export class CustomerSubscription extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  })
  id: string;

  @Column({ allowNull: true })
  package_name: string;

  @Column({ allowNull: false })
  chat_sessions: number;

  @Column({ allowNull: false })
  video_sessions: number;

  @Column({ type: DataTypes.DATE, allowNull: false })
  expiry_date: string;

  @Column({ allowNull: true })
  customer_id: string;

  @Column({ allowNull: true })
  product_id: string;
}
