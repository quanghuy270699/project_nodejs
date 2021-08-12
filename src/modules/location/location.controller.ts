import { Controller, ValidationPipe,
  UploadedFile, UsePipes, Post, Get,
   Body, HttpCode, UseGuards, Request, UseInterceptors } from '@nestjs/common';

import { DistrictDto, WardtDto } from './dto/location.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseBasic } from 'src/shared/swagger/sucess.types';
import { ApiBadRequest } from 'src/shared/swagger/error.types';
import { responseSucess } from 'src/shared/swagger/response.types';
import { VndErrorType } from 'src/shared/error/constant.error';
import { LocationService } from './location.service';
@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private readonly _locationService: LocationService) {
  }

  @Get('/list_provice')
  @HttpCode(200)
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get list provice' })
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_PROVINCE)
  @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
  async getProvince(): Promise<any> {
      return await this._locationService.getListProvince()
  }
 
  // @Post('/postprovice')
  // @HttpCode(200)
  // // @ApiBearerAuth('JWT-auth')
  // @ApiOperation({ summary: 'Get list provice' })
  // @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_PROVINCE)
  // @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
  // async postProvince(): Promise<any> {
  //     return await this._locationService.getProvince()
  // }

  @Post('/list_district')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get list district' })
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_DISTRICT)
  @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
  async getDistrict(@Body() body: DistrictDto): Promise<any> {
      return await this._locationService.getDistrict(body.province_id)
  }

  @Post('/list_ward')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get list ward' })
  @ApiResponseBasic(responseSucess.RESPONSE_SUCESS_WARD)
  @ApiBadRequest(VndErrorType.FAIL_TO_GET_DATA)
  async getWard(@Body() body: WardtDto): Promise<any> {
      return await this._locationService.getWard(body.district_id)
  }
}
