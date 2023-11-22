import { Injectable } from '@nestjs/common';
import {
  CreateCustomerDto,
  SubscriptionDto,
} from 'src/customer/dto/customer.dto';
import { UpdateCustomerDto } from 'src/customer/dto/update-customer.dto';
import { CreateSessionRequirementsDto } from 'src/customer/dto/session-requirements.dto';
import { CustomerRepository } from 'src/customer/customer.repository';
import { RechargeService } from './recharge.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepo: CustomerRepository,
    private readonly rechargeService: RechargeService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    createCustomerDto.profile = true;
    const customer = await this.customerRepo.get_customer(createCustomerDto.id);

    if (customer) {
      await this.customerRepo.update_customer(
        createCustomerDto.id,
        createCustomerDto,
      );
    } else await this.customerRepo.create_customer(createCustomerDto);
    return await this.getCustomerWithSubscription(createCustomerDto.id);
  }

  async findCustomerById(customer_id: string) {
    let customer = await this.getCustomerWithSubscription(customer_id);

    const session_requirements =
      await this.customerRepo.get_session_requirements(customer_id);
    if (customer) {
      return { customer, session_requirements };
    }

    return { message: 'This customer is not exist in DB' };
  }

  async getCustomerWithSubscription(customer_id: string) {
    let customer = await this.customerRepo.get_customer(customer_id);
    const active = await this.customerRepo.getActiveSubscriptionCount(
      customer_id,
    );
    const totalCount = await this.customerRepo.getTotalSubscriptionCount(
      customer_id,
    );

    if (customer) {
      let customerData = {
        id: customer.id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        height: customer.height,
        weight: customer.weight,
        body_shape: customer.body_shape,
        profile: customer.profile,
        preferred_style: customer.preferred_style,
        chat_sessions_available: active[0]?.['chat_sessions_available'] || 0,
        video_sessions_available: active[0]?.['video_sessions_available'] || 0,
        total_chat_sessions: 0,
        total_video_sessions: 0,
      };
      const availablePkg = await this.customerRepo.get_all_product();
      const sessionMap = {};
      for (let pkg of availablePkg) {
        sessionMap[pkg.id] = {
          chat_sessions: pkg.chat_sessions,
          video_sessions: pkg.video_sessions,
        };
      }

      for (let ele of totalCount) {
        customerData.total_chat_sessions =
          customerData.total_chat_sessions +
          ele?.['productCount'] * sessionMap[ele.product_id].chat_sessions;
        customerData.total_video_sessions =
          customerData.total_video_sessions +
          ele?.['productCount'] * sessionMap[ele.product_id].video_sessions;
      }

      return customerData;
    }
  }
  async subscription(customer_id: string, product_id: string, email: string) {
    const getSub = await this.customerRepo.get_subscription_packages_byId(
      product_id,
    );

    if (!getSub) {
      return { message: 'Invalid subscription id' };
    }
    let customer = await this.customerRepo.get_customer(customer_id);
    if (!customer) {
      customer = await this.customerRepo.create_customer({
        id: customer_id,
      });
    }

    const date = new Date();
    const nextDate = date.getDate() + getSub.duration;
    const expiry_date = date.setDate(nextDate);
    const newSubs = {
      package_name: getSub.package_name,
      chat_sessions: getSub.chat_sessions,
      video_sessions: getSub.video_sessions,
      expiry_date: expiry_date,
      customer_id: customer_id,
      product_id: getSub.id,
    };

    const newSub = await this.customerRepo.createCustomerSubscription(newSubs);
    this.rechargeService.cancelPreviousSubscription(email, product_id);
    return { message: 'subscription successfully', data: newSub };
  }
  async usedSubscription(customer_id, key: string) {
    let activeCustomer;
    let updateSub = {};
    if (key == 'chat') {
      activeCustomer = await this.customerRepo.getOldestActiveCusSub(
        customer_id,
        'chat',
      );
      updateSub['chat_sessions'] = activeCustomer.chat_sessions - 1;
    } else if (key == 'video') {
      activeCustomer = await this.customerRepo.getOldestActiveCusSub(
        customer_id,
        'video',
      );
      updateSub['video_sessions'] = activeCustomer.video_sessions - 1;
    } else {
      return { message: 'your package is expired' };
    }

    await this.customerRepo.updateOldestActiveCusSub(
      activeCustomer.id,
      updateSub,
    );
    return { message: 'success' };
  }
  // ///////////////////////////////////////////

  async createCreateSessionRequirements(
    createSessionRequirementsDto: CreateSessionRequirementsDto,
  ) {
    return await this.customerRepo.create_session_requirements(
      createSessionRequirementsDto,
    );
  }

  async findSessionRequirmentsById(customer_id: string) {
    const sessions = await this.customerRepo.get_session_requirements(
      customer_id,
    );
    if (sessions) {
      for (let ind in sessions?.outfit)
        sessions.outfit[ind] =
          process.env.AWS_CLOUDFRONT_URL + sessions.outfit[ind];
      for (let ind in sessions?.optional_outfit)
        sessions.optional_outfit[ind] =
          process.env.AWS_CLOUDFRONT_URL + sessions.optional_outfit[ind];
      return sessions;
    }
    return {
      message: 'Data is not exist',
    };
  }
  //customer_subscription
  async getLatestSubscriptionProduct(customer_id: string) {
    const data = await this.customerRepo.getLatestSubscriptionProduct(
      customer_id,
    );

    if (!data) return { message: "You don't have plan" };
    return data;
  }
}
