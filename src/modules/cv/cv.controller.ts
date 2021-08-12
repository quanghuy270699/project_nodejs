import { Controller, ValidationPipe,
    UploadedFile, UsePipes, Post, Get,
     Body, HttpCode, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user-auth/decorators/user.decorator'; 
import { User } from '../user-account/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { jobCvService } from './cv.service';
import { ApiOperation, ApiBody, ApiHeader, ApiQuery,
  ApiParam, ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiResponseBasic } from 'src/shared/swagger/sucess.types';
import { ApiBadRequest } from 'src/shared/swagger/error.types';
import { responseSucess } from 'src/shared/swagger/response.types';
import { VndErrorType } from 'src/shared/error/constant.error';
import { avatarUploadDto, createCvDto, 
  updateProfileCvDto, ProfileCVDto, createSubmitCvDto } from './dto/cv.dto';
import { ListJobDto } from '../recruitment/dto/recruitment.dto';


  @ApiTags('job-cv')
  @Controller('job-cv')
  export class jobCvController {
    constructor(
      private readonly _jobcvservice: jobCvService
    ) {
    }

    @Get('/list-cv')
    @ApiBearerAuth('JWT-auth')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get list CV' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_LIST_CV)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async getListCv(
      @GetUser() user: User): Promise<any> {
        return await this._jobcvservice.getListProfileCV(user.id)
    }

    @Get('list-submit-cv')
    @ApiBearerAuth('JWT-auth')
    @HttpCode(200)
    @ApiOperation({ summary: ' List CV đã nộp' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_LIST_SUBMIT_CV)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async listSubmitCV(
      @GetUser() user: User): Promise<any> {
        return await this._jobcvservice.listSubmitCV(user.id)
    }
  
    @Post('/profile-cv')
    @ApiBearerAuth('JWT-auth')
    @HttpCode(200)
    @ApiOperation({ summary: 'View chi tiết CV' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_USER_PROFILE_CV)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async getProfileCv(
      @GetUser() user: User,
      @Body() body: ProfileCVDto): Promise<any> {
        return await this._jobcvservice.profileCv(user.id, body.cv_id)
    }

    @Get('/job-career')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get list nghề nghiệp' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_CAREER_DATA)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async getJobCareer(
      @GetUser() user: User): Promise<any> {
        return await this._jobcvservice.getCareer(user.id)
    }

    @Post('/create-cv')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    @HttpCode(200)
    @ApiOperation({ summary: 'Tạo CV' })
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
    @HttpCode(200)
    @ApiBody({description: 'File', type: avatarUploadDto})
    @ApiBearerAuth('JWT-auth')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Upload avatar CV' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_UPLOAD_AVATAR)
    @ApiBadRequest(VndErrorType.USER_UPLOAD_FAIL)
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
    @ApiOperation({ summary: 'Cập nhật CV' })
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


    @Post('/submit-cv')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Ứng tuyển CV' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_DATA)
    @ApiBadRequest(VndErrorType.FAIL_SUBMIT_CV)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async submitCV(
      @GetUser() user: User,
      @Body() body: createSubmitCvDto) {
        return await this._jobcvservice.submitCV(user.id, body)
    }

    @Post('/list-job')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'List tin tuyển dụng' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_LIST_JOB)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async listJob(
      @GetUser() user: User,
      @Body() body: ListJobDto) {
        return await this._jobcvservice.getListJob(user.id, body)
    }

    @Post('/delete-cv')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Delete CV' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_NO_DATA)
    @ApiBadRequest(VndErrorType.FAIL_DELETE_CV)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async deleteCV(
      @GetUser() user: User,
      @Body() body: ProfileCVDto) {
        return await this._jobcvservice.deleteProfileCV(user.id, body.cv_id)
    }
  
  }
  