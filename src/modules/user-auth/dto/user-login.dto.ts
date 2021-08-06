import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class UserLoginDto {
  @IsNotEmpty()
  @ApiProperty({ example: '097478234' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  password: string;
}


export class VerifyOpt {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  otp: string;
}
