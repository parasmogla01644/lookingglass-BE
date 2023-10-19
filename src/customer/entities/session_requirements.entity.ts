import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Customer } from 'src/customer/entities/customer.entity';
import { DataTypes } from 'sequelize';

@Table({ modelName: 'session_requirements', freezeTableName: true })
export class SessionRequirements extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  })
  id: string;

  @Column({ allowNull: false })
  event: string;

  @Column({ allowNull: false })
  feel: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  date: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  phone: string;

  @Column({ type: DataType.ARRAY(DataType.STRING(1024)), allowNull: true })
  outfit: string[] | null;

  @Column({ type: DataType.ARRAY(DataType.STRING(1024)), allowNull: true })
  optional_outfit: string[] | null;

  @ForeignKey(() => Customer)
  @Column({ field: 'customer_id' })
  customerId: string;

  @BelongsTo(() => Customer)
  customer: Customer;
}
