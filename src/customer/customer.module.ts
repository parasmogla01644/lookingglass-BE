import { Module } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerController } from 'src/customer/customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from 'src/customer/entities/customer.entity';
import { SessionRequirements } from 'src/customer/entities/session_requirements.entity';
import { CustomerRepository } from 'src/customer/customer.repository';
import { SubscriptionPackages } from 'src/customer/entities/subscription_package.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Customer,
      SessionRequirements,
      SubscriptionPackages,
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
