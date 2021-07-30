import { IsNotEmpty, IsString } from 'class-validator'

export class UserProfileDto {
  @IsString()
  full_name: string;

  @IsString()
  cccd?: string;

  @IsString()
  cccd_address?: string;

  @IsString()
  cccd_registry_office?: string;

  @IsString()
  birthday?: string;

  @IsString()
  gender?: number;
}