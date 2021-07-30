import { Controller, ValidationPipe,
  UploadedFile, UsePipes, Post, Get,
   Body, HttpCode, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomResponse } from '../../interfaces/Response.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileDto } from '../user-auth/dto';
import { CurrentUser } from '../user-auth/decorators/user.decorator';
import { IJwtPayload } from '../user-auth/jwt-payload.interface';
import { GetUser } from '../user-auth/decorators/user.decorator'; 
import { User } from '../user-account/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDto, UserIdDto } from './dto/user.dto';



@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {
  }

  @HttpCode(200)
  async currentUser(@CurrentUser() user: IJwtPayload): Promise<CustomResponse> {
    return { 
      StatusCode: 200,
      Message: "Success",
      Data: await this._userService.get(user.id)
    }
  }

  @Post('/update-info')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @GetUser() user: User, @Body() body: UserProfileDto): Promise<any> {
  return await this._userService.updateprofile(user.id, body)
  }

  @Post('/upload/image-profile')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async updateprofilepic(
    @GetUser() user: User,
    @UploadedFile() file) {
    return await this._userService.updateprofilepic(file, user.id);
  }

  @Post('/upload/image-ekyc')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageEkyc(
    @GetUser() user: User,
    @UploadedFile() file : Express.Multer.File,
    @Body() dto: UserDto) {
    return await this._userService.ekycphoto(file, dto.upload_type, user.id, dto.cccd_type);
  }


  @Get('/check/images-ekyc')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async checkImageEkyc(
    @GetUser() user: User){
  
    return await this._userService.checkekyc(user.id);
  }

}
