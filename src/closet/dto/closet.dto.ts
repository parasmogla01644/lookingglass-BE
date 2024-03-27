import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClosetDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  season: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  video: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  image: string[];
}

export class GenerateSignedUrlDto {
  @IsString()
  fileName: string;

  @IsString()
  contentType: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}

export class ClosetFilter {
  @IsOptional()
  category: string[];

  @IsOptional()
  brand: string[];

  @IsOptional()
  color: string[];

  @IsOptional()
  season: string[];
}
