import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClosetDto {
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
