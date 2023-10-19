import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'customer_subscription_packages', freezeTableName: true })
export class SubscriptionPackages extends Model {
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
  start_date: string;

  @Column({ type: DataTypes.DATE, allowNull: false })
  end_date: string;
}
