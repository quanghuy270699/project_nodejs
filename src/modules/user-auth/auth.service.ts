import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './repositories/auth.repository';
import { User } from '../user-account/user.entity';
import { IJwtPayload } from '../user-auth/jwt-payload.interface';
import { VndError, VndErrorType } from 'src/shared/error/constant.error';
import { UserRegisterDto } from './dto/user-register.dto';
import { RedisCacheService } from 'src/cache/cache.service';
import { UserLoginDto } from './dto/user-login.dto';
import { genSalt, hash } from 'bcryptjs';
import { compare } from 'bcryptjs';
import { GetOtpPasswordDto } from './dto/password.dto';
import { UserRepository } from '../user-account/repositories/user.repositry';
import { HttpException } from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
    private readonly _redisCacheService: RedisCacheService,
    private readonly _UserRepository: UserRepository) { }


  async register(userRegisterDto: UserRegisterDto): Promise<any> {
    const userExists = await this._authRepository.findOne({ where: 
      { username: userRegisterDto.phone_number } });
    if (userExists) {
      throw new HttpException(VndErrorType.USER_CONFLICT, 402);
    }
    const token = "123456"
    await this._redisCacheService.set(userRegisterDto.phone_number, token)
    return { 
      StatusCode: 200, 
      Message: 'Success'
    }
  }

  async login(userLoginDto: UserLoginDto): Promise<any> {
    // Check exist
    const user: User = await this._authRepository.findOne({ where: 
      { username: userLoginDto.username } });    
    if (!user) {
      throw new HttpException(VndErrorType.USER_NOT_FOUND, 402);
    }
    // Compare user.Password === password
    const isMatch = await compare(userLoginDto.password, user.password);
    if (!isMatch) {
      throw new HttpException(VndErrorType.USER_UNAUTHORIZED, 402);
    }

    // Make payload to generate token
    const payload: IJwtPayload = {
      id: user.id,
      username: user.username,
      ekyc: user.Profile.ekyc
    };
    const token = await this._jwtService.sign(payload);

    return {
      StatusCode: 200, 
      Message: 'Success',
      Data: {token:token, 
            user_info: payload}
    }
  }

  async verifyotp(userRegisterDto: UserRegisterDto, otp:string): Promise<any> {
    
    const cachotp = await this._redisCacheService.get(userRegisterDto.phone_number);
    if (cachotp !== otp){
      throw new HttpException(VndErrorType.USER_OTP_NOT_MATCH, 402);
    }
    const user_id = await this._authRepository.register(userRegisterDto);
    return {
      StatusCode: 200, 
      Message: 'Success',
      Data: {
        "user_id": user_id,
        "phonenumber": userRegisterDto.phone_number
      }
    }
  }


  async getotppassword(phone_number: string): Promise<any | undefined> {
    const user: User = await this._UserRepository.findOne({ where: 
                { username: phone_number } });
    
    if (!user) {
      throw new HttpException(VndErrorType.USER_NOT_FOUND, 402);
    }
    const token = "123456" //await this.randomNumber(6);
    await this._redisCacheService.set(phone_number, token)
    return { 
      StatusCode: 200, 
      Message: 'Success'
    }
  }


  async forgotpassword(phonenumber: string, otp: string, newpassword:string): Promise<any> {
    const cacheotp = await this._redisCacheService.get(phonenumber);
    if (otp !== cacheotp){
      throw new HttpException(VndErrorType.USER_OTP_NOT_MATCH, 402);
    }
    
    const user: User = await this._UserRepository.findOne({ where: 
      { username: phonenumber } });
    if (user.username !== phonenumber){
      throw new HttpException(VndErrorType.USER_NOT_FOUND, 402);
      
    }
    const salt = await genSalt(10);
    const password = await hash(newpassword, salt);
    await this._UserRepository.update(user.id, {password: password})
    return { 
      StatusCode: 200, 
      Message: 'Success'
    }
  }


  async changepassword(userid:string, oldpassword: string, newpassword: string): Promise<any> {
    const user: User = await this._UserRepository.findOne({ where: 
      { id: userid } });
    
    const OldPass = oldpassword;
    const isMatch = await compare(OldPass, user.password);
    if (!isMatch) {
      throw new HttpException(VndErrorType.USER_PASSWORD_NOT_CORRECT, 402);
    }

    const salt = await genSalt(10);
    const password = await hash(newpassword, salt);
    await this._UserRepository.update(user.id, {password: password})
    return { 
      StatusCode: 200, 
      Message: 'Success'
    }

  }

  async randomNumber (length: number) {
    let text: string = "";
    const possible = "123456789";
    for (let i = 0; i < length; i++) {
        let sup: number = Math.floor(Math.random() * possible.length);
        text += i > 0 && sup == i ? "0" : possible.charAt(sup);
    }
    return text;
  }

}
