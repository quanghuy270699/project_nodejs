import { Controller, ValidationPipe,
    UploadedFile, UsePipes, Post, Get,
     Body, HttpCode, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { CustomResponse } from '../../interfaces/Response.interface';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileDto } from '../user-auth/dto';
import { CurrentUser } from '../user-auth/decorators/user.decorator';
import { IJwtPayload } from '../user-auth/jwt-payload.interface';
import { GetUser } from '../user-auth/decorators/user.decorator'; 
import { User } from '../user-account/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { jobCvService } from './job.cv.service';
import { ApiOperation, ApiBody, ApiHeader, ApiQuery,
  ApiParam, ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiResponseBasic } from 'src/shared/swagger/sucess.types';
import { ApiBadRequest } from 'src/shared/swagger/error.types';
import { responseSucess } from 'src/shared/swagger/response.types';
import { VndErrorType } from 'src/shared/error/constant.error';
import { avatarUploadDto, createCvDto, 
  updateProfileCvDto, ProfileCVDto } from './dto/job.cv.dto';


  @ApiTags('job-cv')
  @Controller('job-cv')
  export class jobCvController {
    constructor(
      private readonly _jobcvservice: jobCvService
    ) {
    }

    @Get('/list-cv')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get list CV' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_LIST_CV)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async getListCv(
      @GetUser() user: User): Promise<any> {
        return await this._jobcvservice.getListProfileCV(user.id)
    }
  
    @Post('/profile-cv')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'View Profile CV' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_USER_PROFILE_CV)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async getProfileCv(
      @GetUser() user: User,
      @Body() body: ProfileCVDto): Promise<any> {
        return await this._jobcvservice.profileCv(user.id, body.cv_id)
    }

    @Get('/job-career')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get list job career' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_CAREER_DATA)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async getJobCareer(
      @GetUser() user: User): Promise<any> {
        return await this._jobcvservice.getCareer(user.id)
    }

    @Post('/create-cv')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Create Profle CV' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_DATA)
    @ApiBadRequest(VndErrorType.FAIL_CREATE_CV)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async uploadAvatar(
      @GetUser() user: User, 
      @Body() body: createCvDto): Promise<any> {
        return await this._jobcvservice.createCv(user.id, body)
    }

    @Post('/upload-avatar')
    @ApiBody({description: 'File', type: avatarUploadDto})
    @ApiBearerAuth('JWT-auth')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Upload avatar profile CV' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_UPLOAD_AVATAR)
    @ApiBadRequest(VndErrorType.USER_UPLOAD_FAIL)
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async updateprofilepic(
      @GetUser() user: User,
      @UploadedFile() file) {
        return await this._jobcvservice.uploadAvatar(file, user.id)
    }
  
    @Post('/update-cv')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Update profile CV' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_NO_DATA)
    @ApiBadRequest(VndErrorType.FAIL_UPDATE_CV)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async updateCV(
      @GetUser() user: User,
      @Body() body: updateProfileCvDto) {
        return await this._jobcvservice.updateProfileCV(user.id, body)
    }

    @Post('/delete-cv')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Delete profile CV' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_NO_DATA)
    @ApiBadRequest(VndErrorType.FAIL_DELETE_CV)
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async deleteCV(
      @GetUser() user: User,
      @Body() body: ProfileCVDto) {
        return await this._jobcvservice.deleteProfileCV(user.id, body.cv_id)
    }
  
  }
  