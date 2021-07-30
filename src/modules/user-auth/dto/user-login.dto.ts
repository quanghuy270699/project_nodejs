import { IsNotEmpty } from "class-validator";

export class UserLoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}


export class VerifyOpt {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  otp: string;
}
