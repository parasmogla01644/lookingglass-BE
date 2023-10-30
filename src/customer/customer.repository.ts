import { Injectable, Inject } from '@nestjs/common';
import { Customer } from 'src/customer/entities/customer.entity';
import { InjectModel } from '@nestjs/sequelize';
import { SessionRequirements } from 'src/customer/entities/session_requirements.entity';
import { SubscriptionPackages } from './entities/subscription_package.entity';
import { CustomerSubscription } from './entities/customer_subscription';
import sequelize from 'sequelize';
@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer)
    private customer: typeof Customer,
    @InjectModel(SessionRequirements)
    private sessionRequirements: typeof SessionRequirements,
    @InjectModel(SubscriptionPackages)
    private subscriptionPackages: typeof SubscriptionPackages,
    @InjectModel(CustomerSubscription)
    private customerSubscription: typeof CustomerSubscription,
  ) {}

  create_customer(data) {
    return this.customer.create(data);
  }

  get_customer(customer_id: string) {
    return this.customer.findOne({ where: { id: customer_id } });
  }

  update_customer(customer_id, data) {
    return this.customer.update(data, {
      where: { id: customer_id },
    });
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
      order: [['createdAt', 'desc']],
    });
  }

  //////////////

  get_subscription_packages_byId(id: string) {
    return this.subscriptionPackages.findOne({
      where: { id },
    });
  }

  ///////////////
  createCustomerSubscription(data) {
    return this.customerSubscription.create(data);
  }

  async getActiveSubscriptionCount(customer_id) {
    const date = new Date();
    const res = await this.customerSubscription.findAll({
      attributes: [
        [
          sequelize.fn('sum', sequelize.col('chat_sessions')),
          'chat_sessions_available',
        ],
        [
          sequelize.fn('sum', sequelize.col('video_sessions')),
          'video_sessions_available',
        ],
      ],

      where: {
        customer_id: customer_id,
        expiry_date: {
          [sequelize.Op.gt]: new Date(),
        },
      },
      raw: true,
    });
    return res;
  }

  async getTotalSubscriptionCount(customer_id) {
    const res = await this.customerSubscription.findAll({
      attributes: [
        'product_id',
        [sequelize.fn('count', sequelize.col('product_id')), 'product'],
      ],

      where: {
        customer_id: customer_id,
      },
      group: ['product_id'],
      raw: true,
    });
    return res;
  }

  getLatestSubscriptionProduct(customer_id: string) {
    return this.customerSubscription.findOne({
      where: { customer_id },
      order: [['createdAt', 'desc']],
    });
  }

  getOldestActiveCusSub(customer_id, cond?: any) {
    let whereCon = {
      customer_id: customer_id,
      expiry_date: {
        [sequelize.Op.gt]: new Date(),
      },
    };

    if (cond == 'chat')
      whereCon['chat_sessions'] = {
        [sequelize.Op.gt]: 0,
      };
    if (cond == 'video')
      whereCon['video_sessions'] = {
        [sequelize.Op.gt]: 0,
      };
    return this.customerSubscription.findOne({
      where: whereCon,

      order: [['expiry_date', 'asc']],
    });
  }
  updateOldestActiveCusSub(id, data) {
    console.log(id, data);

    return this.customerSubscription.update(data, {
      where: { id: id },
    });
  }
}
