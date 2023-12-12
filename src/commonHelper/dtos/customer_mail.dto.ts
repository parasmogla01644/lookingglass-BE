import { IsNotEmpty, IsOptional } from 'class-validator';

export class CustomerMaillDto {
  @IsNotEmpty()
  customerId: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  event: string;
  @IsNotEmpty()
  feel: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  outfit: string[];
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  type: string;
}

export class MailDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
}

export class MessageDto {
  @IsNotEmpty()
  number: string;
}
