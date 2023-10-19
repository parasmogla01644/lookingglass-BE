import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  height: string;

  @IsString()
  @IsNotEmpty()
  weight: string;

  @IsString()
  @IsNotEmpty()
  body_shape: string;

  @IsString()
  @IsNotEmpty()
  preferred_style: string;

  profile: boolean = true;

  //   chat_sessions_available: number;

  //   video_sessions_available: number;

  //   total_chat_sessions: number;

  //   total_video_sessions: number;
}

export class SubscriptionDto {
  @IsPositive()
  chat_sessions: number;
  @IsPositive()
  video_sessions: number;
}
