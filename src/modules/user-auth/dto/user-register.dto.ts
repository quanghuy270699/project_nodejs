import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @IsNotEmpty()
  @ApiProperty({ example: '129292039292' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: '0973783783' })
  phone_number: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'matkhau' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  gender: number;

}

export class UserVeryfyRegisterDto {
  @IsNotEmpty()
  @ApiProperty({ example: '129292039292' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: '0973783783' })
  phone_number: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'matkhau' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  gender: number;

  
  @ApiProperty({ example: '123456' })
  otp?: string;
}

