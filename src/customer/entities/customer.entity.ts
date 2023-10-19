import {
  Column,
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

  @Column({ allowNull: false })
  first_name: string;

  @Column({ allowNull: false })
  last_name: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  phone: string;

  @Column({ allowNull: false })
  height: string;

  @Column({ allowNull: false })
  weight: string;

  @Column({ allowNull: false })
  body_shape: string;

  @Column({ allowNull: false })
  preferred_style: string;

  @Column({ allowNull: false, defaultValue: 0 })
  chat_sessions_available: number;

  @Column({ allowNull: false, defaultValue: 0 })
  video_sessions_available: number;

  @Column({ allowNull: false, defaultValue: 0 })
  total_chat_sessions: number;

  @Column({ allowNull: false, defaultValue: 0 })
  total_video_sessions: number;

  @HasMany(() => SessionRequirements)
  session_requirements: SessionRequirements[];
}
