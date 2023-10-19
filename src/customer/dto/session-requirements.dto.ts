import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionRequirementsDto {
  @IsString()
  @IsNotEmpty()
  event: string;

  @IsString()
  @IsNotEmpty()
  feel: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsArray()
  outfit: string[] = [];
  @IsArray()
  optional_outfit: string[] = [];

  @IsString()
  @IsNotEmpty()
  customerId: string;
}
