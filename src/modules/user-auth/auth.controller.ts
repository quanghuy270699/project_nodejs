import { Controller, Post, Body, UsePipes, 
  ValidationPipe, HttpCode, Res, UseGuards,
  HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VndError } from 'src/shared/error/constant.error';
import { CustomResponse } from '../../interfaces/Response.interface'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserRegisterDto, UserVeryfyRegisterDto } from './dto/user-register.dto';
import { UserLoginDto, VerifyOpt } from './dto/user-login.dto';
import { PasswordOtpDto, GetOtpPasswordDto, 
  FotgotPasswordDto, ChangePasswordDto } from './dto/password.dto';
import { CurrentUser } from './decorators/user.decorator';
import { IJwtPayload } from './jwt-payload.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/user.decorator';
import { User } from '../user-account/user.entity';
import { ApiResponseBasic } from 'src/shared/swagger/sucess.types';
import { ApiBadRequest } from 'src/shared/swagger/error.types';
import { responseSucess } from 'src/shared/swagger/response.types';
import { VndErrorType } from 'src/shared/error/constant.error';

@ApiTags('auth user')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService) { }

  @Post('/register')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Register account CDS' })
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_NO_DATA)
  @ApiBadRequest(VndErrorType.USER_CONFLICT)
  @HttpCode(200)
  async register(@Body() userRegisterDto: UserRegisterDto): Promise<CustomResponse> {
    return await this._authService.register(userRegisterDto)
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @ApiOperation({ summary: 'Login CDS' })
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_LOGIN_DATA)
  @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
  async signin(@Body() userLoginDto: UserLoginDto): Promise<CustomResponse> {
    return await this._authService.login(userLoginDto) 
  }


  @Post('/register/verify-otp')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @ApiOperation({ summary: 'Verified account otp' })
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_DATA)
  @ApiBadRequest(VndErrorType.USER_OTP_NOT_MATCH)
  async verifyotp(@Body() userveryRegisterDto: UserVeryfyRegisterDto): Promise<CustomResponse> {    
    return await this._authService.verifyotp(userveryRegisterDto, userveryRegisterDto.otp)
  }

  @Post('/forgot/password-otp')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @ApiOperation({ summary: 'get OTP password account CDS' })
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_NO_DATA)
  @ApiBadRequest(VndErrorType.USER_NOT_IN_SYSTEM)
  async forgetpasswordotp(
    @Body() data: GetOtpPasswordDto): Promise<CustomResponse> {
      return await this._authService.getotppassword(data.phone_number)
  }



  @Post('/forgot/password')
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_NO_DATA)
  @ApiBadRequest(VndErrorType.USER_OTP_NOT_MATCH)
  @ApiBadRequest(VndErrorType.USER_NOT_FOUND)
  @ApiOperation({ summary: 'Veried otp forgot password CDS' })
  @UsePipes(ValidationPipe)
  @HttpCode(200)
    async newPassword(
        @Body() userData: FotgotPasswordDto): Promise<CustomResponse> {
        return  await this._authService.forgotpassword(userData.phone_number, userData.otp, userData.newpassword)
    }


  @Post('/change/password')
  @UsePipes(ValidationPipe)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Change password' })
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_NO_DATA)
  @ApiBadRequest(VndErrorType.USER_PASSWORD_NOT_CORRECT)
  @UseGuards(AuthGuard())
  @HttpCode(200)
    async ChangePassword(
        @GetUser() user: User,
        @Body() userData: ChangePasswordDto): Promise<CustomResponse> {
        return await this._authService.changepassword(user.id, userData.oldpassword, userData.newpassword);
        
    }

}
