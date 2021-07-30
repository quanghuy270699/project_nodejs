import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VndError } from 'src/shared/error/constant.error';
import { CustomResponse } from '../../interfaces/Response.interface'
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto, VerifyOpt } from './dto/user-login.dto';
import { PasswordOtpDto, GetOtpPasswordDto, FotgotPasswordDto, ChangePasswordDto } from './dto/password.dto';
import { CurrentUser } from './decorators/user.decorator';
import { IJwtPayload } from './jwt-payload.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/user.decorator';
import { User } from '../user-account/user.entity';

@ApiTags('auth user')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService) { }

  @Post('/register')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  async register(@Body() userRegisterDto: UserRegisterDto): Promise<CustomResponse> {
    return await this._authService.register(userRegisterDto)
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  async signin(@Body() userLoginDto: UserLoginDto): Promise<CustomResponse> {
    const token = await this._authService.login(userLoginDto)
    return await this._authService.login(userLoginDto) 
  }


  @Post('/register/verify-otp')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  async verifyotp(@Body() userRegisterDto: UserRegisterDto): Promise<CustomResponse> {    
    return await this._authService.verifyotp(userRegisterDto, userRegisterDto.otp)
  }

  @Post('/forgot/password-otp')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  async forgetpasswordotp(
    @Body() data: GetOtpPasswordDto): Promise<CustomResponse> {
      return await this._authService.getotppassword(data.phonenumber)
  }



  @Post('/forgot/password')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
    async newPassword(
        @Body() userData: FotgotPasswordDto): Promise<CustomResponse> {
        return  await this._authService.forgotpassword(userData.phonenumber, userData.otp, userData.newpassword)
    }


  @Post('/change/password')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  @HttpCode(200)
    async ChangePassword(
        @GetUser() user: User,
        @Body() userData: ChangePasswordDto,
        @Res() res): Promise<CustomResponse> {
          return await this._authService.changepassword(user.id, userData.oldpassword, userData.newpassword);
        
    }

}
