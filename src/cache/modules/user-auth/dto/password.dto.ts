import { Length, Matches } from 'class-validator';

export class GetOtpPasswordDto {
  phonenumber?: string;

}

export class FotgotPasswordDto {
  phonenumber?: string;

  otp?: string;

  newpassword?: string;

}

export class PasswordOtpDto {
  phonenumber?: string;

  otp?: string;

}


export class ChangePasswordDto {


  oldpassword?: string;

  newpassword?: string;

}