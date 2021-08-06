import { Controller, ValidationPipe,
  UploadedFile, UsePipes, Post, Get,
   Body, HttpCode, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomResponse } from '../../interfaces/Response.interface';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileDto } from '../user-auth/dto';
import { CurrentUser } from '../user-auth/decorators/user.decorator';
import { IJwtPayload } from '../user-auth/jwt-payload.interface';
import { GetUser } from '../user-auth/decorators/user.decorator'; 
import { User } from '../user-account/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDto, UserDto, UserIdDto } from './dto/user.dto';
import { ApiOperation, ApiBody,
  ApiParam, ApiBearerAuth, ApiConsumes, 
  ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseBasic } from 'src/shared/swagger/sucess.types';
import { ApiBadRequest } from 'src/shared/swagger/error.types';
import { responseSucess } from 'src/shared/swagger/response.types';
import { VndErrorType } from 'src/shared/error/constant.error';
import { UserUploadDto } from './dto/user.dto';
@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {
  }

  @Get('/user-info')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get basic user info' })
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_USER_INFO_EKYC)
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_USER_INFO)
  @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
  // @ApiParam({
  //   name: 'isbn',
  //   description: ''})
  // @ApiOperation({ summary: 'Get all games' })
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async getUserInfo(
    @GetUser() user: User): Promise<any> {
      return await this._userService.getdata(user.id)
  }


  @Post('/update-info')
  @HttpCode(200)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update user info' })
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_DATA)
  @ApiBadRequest(VndErrorType.USER_NOT_FOUND)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @GetUser() user: User, @Body() body: UpdateProfileDto): Promise<any> {
  return await this._userService.updateprofile(user.id, body)
  }


  @Post('/upload/image-profile')
  @ApiBody({description: 'File', type: UserUploadDto})
  @ApiOperation({ summary: 'Upload image profile' })
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_DATA)
  @ApiBadRequest(VndErrorType.USER_UPLOAD_FAIL)
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async updateprofilepic(
    @GetUser() user: User,
    @UploadedFile() file) {
    console.log(file)
    return await this._userService.updateprofilepic(file, user.id);
  }

  @Post('/upload/image-ekyc')
  @ApiBearerAuth('JWT-auth')
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_NO_DATA)
  @ApiBadRequest(VndErrorType.USER_UPLOAD_FAIL)
  @ApiConsumes('multipart/form-data')
  @ApiBody({description: 'File', type: UserDto})
  @ApiOperation({ summary: 'Upload image to EKY' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageEkyc(
    @GetUser() user: User,
    @UploadedFile() file : Express.Multer.File,
    @Body() dto: UserDto) {
    return await this._userService.ekycphoto(file, dto.upload_type, user.id);
  }


  @Get('/check/images-ekyc')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Check YKYC' })
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_EKYC_DATA)
  @ApiBadRequest(VndErrorType.REQUEST_TO_AI_FAIL)
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async checkImageEkyc(
    @GetUser() user: User){
  
    return await this._userService.checkekyc(user.id);
  }

  // @Get('/user-info')
  // @HttpCode(200)
  // @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard('jwt'))
  // async getUserInfo(
  //   @GetUser() user: User, @Body() body: UserProfileDto): Promise<any> {
  // return await this._userService.updateprofile(user.id, body)
  // }

}
