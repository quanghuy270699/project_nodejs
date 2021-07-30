import { IsNotEmpty } from "class-validator";

export class UserRegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phonenumber: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  gender: number;

  otp?: string;
}
