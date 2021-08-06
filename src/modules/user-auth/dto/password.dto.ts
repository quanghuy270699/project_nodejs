import { Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOtpPasswordDto {
  @ApiProperty({ example: '097478234' })
  phone_number?: string;

}

export class FotgotPasswordDto {
  @ApiProperty({ example: '097478234' })
  phone_number?: string;

  @ApiProperty({ example: '123456' })
  otp?: string;

  @ApiProperty({ example: 'matkhaumoi' })
  newpassword?: string;

}

export class PasswordOtpDto {
  @ApiProperty({ example: '097478234' })
  phone_number?: string;

  @ApiProperty({ example: '123456' })
  otp?: string;

}


export class ChangePasswordDto {

  @ApiProperty({ example: 'matkhaucu' })
  oldpassword?: string;

  @ApiProperty({ example: 'matkhaumoi' })
  newpassword?: string;

}