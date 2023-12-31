import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { UpdateCustomerDto } from 'src/customer/dto/update-customer.dto';
import { CreateCustomerDto, SubscriptionDto } from 'src/customer/dto/customer.dto';
import { CreateSessionRequirementsDto } from 'src/customer/dto/session-requirements.dto';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/customer')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get('/customer/:customer_id')
  findCustomerById(@Param('customer_id') customer_id: string) {
    return this.customerService.findCustomerById(customer_id);
  }
  /////////////////////////////////

  @Post('/subscription/:customer_id')
  uodateCustomerValidity(
    @Param('customer_id') customer_id: string,
    @Body() subscription_id: string,
  ) {
    return this.customerService.subscription(customer_id, subscription_id);
  }
  @Put('/subscription/used/:customer_id')
  uodateUsedSubscription(
    @Param('customer_id') customer_id: string,
    @Body() body,
  ) {
    return this.customerService.usedSubscription(customer_id, body.key);
  }

  ///////////////////////////////////////
  @Post('/session-requirements')
  createSessionRequirements(
    @Body() createSessionRequirementsDto: CreateSessionRequirementsDto,
  ) {
    return this.customerService.createCreateSessionRequirements(
      createSessionRequirementsDto,
    );
  }

  @Get('/session-requirements/:id')
  findSessionRequirmentsById(@Param('id') id: string) {
    return this.customerService.findSessionRequirmentsById(id);
  }
}
