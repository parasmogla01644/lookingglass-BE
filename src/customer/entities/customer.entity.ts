import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { SessionRequirements } from 'src/customer/entities/session_requirements.entity';

@Table({ modelName: 'customer', freezeTableName: true })
export class Customer extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column({ allowNull: true })
  first_name: string;

  @Column({ allowNull: true })
  last_name: string;

  @Column({ allowNull: true })
  email: string;

  @Column({ allowNull: true })
  phone: string;

  @Column({ allowNull: true })
  height: string;

  @Column({ allowNull: true })
  weight: string;

  @Column({ allowNull: true })
  body_shape: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  profile: boolean;

  @Column({ allowNull: true })
  preferred_style: string;

  @Column({ allowNull: true, defaultValue: 0 })
  chat_sessions_available: number;

  @Column({ allowNull: true, defaultValue: 0 })
  video_sessions_available: number;

  @Column({ allowNull: true, defaultValue: 0 })
  total_chat_sessions: number;

  @Column({ allowNull: true, defaultValue: 0 })
  total_video_sessions: number;

  @HasMany(() => SessionRequirements)
  session_requirements: SessionRequirements[];
}
