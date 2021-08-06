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
import { ApiOperation, ApiBody, ApiHeader, ApiQuery,
  ApiParam, ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiResponseBasic } from 'src/shared/swagger/sucess.types';
import { ApiBadRequest } from 'src/shared/swagger/error.types';
import { responseSucess } from 'src/shared/swagger/response.types';
import { VndErrorType } from 'src/shared/error/constant.error';
import { CreateProfileDto, UploadDto, 
  updateProfileCvDto, ProfileCVDto, CreateRecruitmentDto } from './dto/recruitment.dto';
import { recruitmentService } from './recruitment.service';
import { multerOptions } from 'src/shared/multer.storage';


  @ApiTags('recruitment')
  @Controller('recruitment')
  export class recruitmentController {
    constructor(
      private readonly _recruitmentService: recruitmentService
    ) {
    }

    @Get('/fields-career')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get fields career' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_LIST_FIELDS_CAREER)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async getListCv(
      @GetUser() user: User): Promise<any> {
        return await this._recruitmentService.getfieldsCareer(user.id)
    }

    @Post('/profile-company')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Create Profile Company' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_DATA)
    @ApiBadRequest(VndErrorType.FAIL_CREATE_CV)
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async getProfileCv(
      @GetUser() user: User,
      @Body() body: CreateProfileDto): Promise<any> {
        return await this._recruitmentService.createProfileCompany(user.id, body)
    }

    @Post('/upload-photo')
    @ApiBody({description: 'File', type: UploadDto})
    @ApiBearerAuth('JWT-auth')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Upload Photo cover or logo company' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_UPLOAD_PHOTO)
    @ApiBadRequest(VndErrorType.USER_UPLOAD_FAIL)
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async updateprofilepic(
      @GetUser() user: User,
      @UploadedFile() file,
      @Body() dto: UploadDto) {
        return await this._recruitmentService.uploadphoto(file, user.id, dto.upload_type)
    }
  
    @Post('/my-profile')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'View Profile Company' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_JOBCOMPANY_DATA)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async updateCV(
      @GetUser() user: User) {
        return await this._recruitmentService.profileCompany(user.id)
    }

    @Get('/list-recruitment')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get list recruitment' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_LIST_CV)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async getListRecruitment(
      @GetUser() user: User): Promise<any> {
        return await this._recruitmentService.getListNewsRecruitment(user.id)
    }

    @Post('/create-recruitment')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'View Profile Company' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_JOBCOMPANY_DATA)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async createNewRecruitment(
      @GetUser() user: User,
      @Body() body: CreateRecruitmentDto) {
        return await this._recruitmentService.createNewRecruitment(user.id, body)
    }

    @Post('/news-recruitment')
    @HttpCode(200)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'View Profile Company' })
    @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_JOBCOMPANY_DATA)
    @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    async NewRecruitment(
      @GetUser() user: User,
      @Body() body: CreateRecruitmentDto) {
        return await this._recruitmentService.createNewRecruitment(user.id, body)
    }
  }
  