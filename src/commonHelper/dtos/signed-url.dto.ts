import { IsNotEmpty, IsOptional } from 'class-validator';

export class SignedUrlDto {
  @IsNotEmpty()
  public key: string;

  @IsNotEmpty()
  public method: string;

  @IsOptional()
  public content: string;

  public expires_in: number;
}
