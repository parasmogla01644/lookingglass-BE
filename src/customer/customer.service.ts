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

    if (customer) return customer;
    return await this.customerRepo.create_customer(createCustomerDto);
  }

  async findCustomerById(customer_id: string) {
    const customer = await this.customerRepo.get_customer(customer_id);
    const session_requirements =
      await this.customerRepo.get_session_requirements(customer_id);
    if (customer) {
      return { customer, session_requirements };
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

    const updateSub = {
      total_chat_sessions: customer.total_chat_sessions + getSub.chat_sessions,
      total_video_sessions:
        customer.total_video_sessions + getSub.video_sessions,
      chat_sessions_available:
        customer.chat_sessions_available + getSub.chat_sessions,
      video_sessions_available:
        customer.video_sessions_available + getSub.video_sessions,
    };
    await this.customerRepo.updateValidity(customer_id, updateSub);
    return { message: 'success', subscription_details: updateSub };
  }
  async usedSubscription(customer_id, key: string) {
    const customer = await this.customerRepo.get_customer(customer_id);
    let updateSub = {};
    if (key == 'chat' && customer.chat_sessions_available > 0)
      updateSub = {
        chat_sessions_available: customer.chat_sessions_available - 1,
      };
    else if (key == 'video' && customer.video_sessions_available > 0)
      updateSub = {
        video_sessions_available: customer.video_sessions_available - 1,
      };
    else {
      return { message: 'your package is expired' };
    }
    await this.customerRepo.updateValidity(customer_id, updateSub);
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
}
