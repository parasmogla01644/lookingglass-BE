import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from 'src/customer/dto/customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
