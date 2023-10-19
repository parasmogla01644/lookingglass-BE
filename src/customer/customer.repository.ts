import { Injectable, Inject } from '@nestjs/common';
import { Customer } from 'src/customer/entities/customer.entity';
import { InjectModel } from '@nestjs/sequelize';
import { SessionRequirements } from 'src/customer/entities/session_requirements.entity';
import { SubscriptionPackages } from 'src/customer/entities/customer_subscription_package';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer)
    private customer: typeof Customer,
    @InjectModel(SessionRequirements)
    private sessionRequirements: typeof SessionRequirements,
    @InjectModel(SubscriptionPackages)
    private subscriptionPackages: typeof SubscriptionPackages,
  ) {}

  create_customer(data) {
    return this.customer.create(data);
  }

  get_customer(customer_id: string) {
    return this.customer.findOne({ where: { id: customer_id } });
  }

  updateValidity(customer_id, validity: object) {
    return this.customer.update(validity, {
      where: { id: customer_id },
    });
  }
  //////////////////////

  create_session_requirements(data) {
    return this.sessionRequirements.create(data);
  }

  get_session_requirements(customer_id: string) {
    return this.sessionRequirements.findOne({
      where: { customer_id },
      order: [['createdAt', 'asc']],
    });
  }

  //////////////

  get_subscription_packages_byId(id: string) {
    return this.subscriptionPackages.findOne({
      where: { id },
    });
  }
}
