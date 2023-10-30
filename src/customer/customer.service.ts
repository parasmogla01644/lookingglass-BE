import { Injectable } from '@nestjs/common';
import {
  CreateCustomerDto,
  SubscriptionDto,
} from 'src/customer/dto/customer.dto';
import { UpdateCustomerDto } from 'src/customer/dto/update-customer.dto';
import { CreateSessionRequirementsDto } from 'src/customer/dto/session-requirements.dto';
import { CustomerRepository } from 'src/customer/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto) {
    createCustomerDto.profile = true;
    const customer = await this.customerRepo.get_customer(createCustomerDto.id);

    if (customer) {
      await this.customerRepo.update_customer(
        createCustomerDto.id,
        createCustomerDto,
      );
    } else return await this.customerRepo.create_customer(createCustomerDto);
    const update_customer = await this.customerRepo.get_customer(
      createCustomerDto.id,
    );
    return update_customer;
  }

  async findCustomerById(customer_id: string) {
    let customer = await this.customerRepo.get_customer(customer_id);
    const active = await this.customerRepo.getActiveSubscriptionCount(
      customer_id,
    );
    const totalCount = await this.customerRepo.getTotalSubscriptionCount(
      customer_id,
    );
    const session_requirements =
      await this.customerRepo.get_session_requirements(customer_id);
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
      for (let ele of totalCount) {
        if (ele?.product_id === '8822048915749') {
          customerData.total_chat_sessions =
            customerData.total_chat_sessions + ele?.['product'] * 3;
          customerData.total_video_sessions =
            customerData.total_video_sessions + ele?.['product'] * 2;
        }
        if (ele.product_id === '8822048293157') {
          customerData.total_chat_sessions =
            customerData.total_chat_sessions + ele?.['product'] * 5;
          customerData.total_video_sessions =
            customerData.total_chat_sessions + ele?.['product'] * 5;
        }
      }

      return { customer: customerData, session_requirements };
    }

    return { message: 'This customer is not exist in DB' };
  }

  async subscription(customer_id: string, subscription_id: string) {
    const getSub = await this.customerRepo.get_subscription_packages_byId(
      subscription_id,
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

    // const updateSub = {
    //   total_chat_sessions: customer.total_chat_sessions + getSub.chat_sessions,
    //   total_video_sessions:
    //     customer.total_video_sessions + getSub.video_sessions,
    //   chat_sessions_available:
    //     customer.chat_sessions_available + getSub.chat_sessions,
    //   video_sessions_available:
    //     customer.video_sessions_available + getSub.video_sessions,
    // };

    // await this.customerRepo.updateValidity(customer_id, updateSub);
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
    if (sessions) return sessions;
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
