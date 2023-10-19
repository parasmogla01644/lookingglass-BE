import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'subscription_packages', freezeTableName: true })
export class SubscriptionPackages extends Model {
  @Column({
    type: DataTypes.STRING,
    primaryKey: true,
  })
  id: string;

  @Column({ allowNull: true })
  package_name: string;

  @Column({ allowNull: false })
  chat_sessions: number;

  @Column({ allowNull: false })
  video_sessions: number;

  @Column({ allowNull: false })
  duration: number;
}
