import { Injectable, BadRequestException,
  HttpException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VndErrorType } from 'src/shared/error/constant.error';
import { MProvince } from './province.entity';
import { MProvinceRepository } from './repositories/province.repositry';
import { MDistrictRepository } from './repositories/district.repository';
import { MWardRepository } from './repositories/ward.repository';
import { MDistrict } from './district.entity';
import { MWard } from './ward.entity';


@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(MProvince)
    private readonly _MProvinceRepository: MProvinceRepository,
    private readonly _MDistrictRepository: MDistrictRepository,
    private readonly _MWardRepository: MWardRepository,

  ) {
    
  }

  async getProvince(province_id:number): Promise<any> {
    const province: MProvince = await this._MProvinceRepository.findOne({where: {province_id: province_id }});
    console.log('================', province)
  
    if (!province) {
      throw new HttpException(VndErrorType.USER_NOT_FOUND, 402);
    }

      return province
  }

  async getListProvince(): Promise<any> {
    const province: MProvince[] = await this._MProvinceRepository.find({ order: {"province_name":"ASC"}});
  
    if (!province) {
      throw new HttpException(VndErrorType.USER_NOT_FOUND, 402);
    }

    let result = [];
        for (var _i = 0; _i < province.length; _i++) {
          var provinceData = province[_i];
          result.push({
            provice_id: provinceData.province_id,
            provice_name: provinceData.province_name

          })
          
        }
      
      return { 
        StatusCode: 200, 
        Message: 'Success',
        Data:result
      }
  }

  async getWard(district_id:number): Promise<any> {
    const district: MWard[] = await this._MWardRepository.find({ where: { district_id: district_id }, order: {"ward_name":"ASC"}});
  
    if (!district) {
      throw new HttpException(VndErrorType.USER_NOT_FOUND, 402);
    }

    let result = [];
        for (var _i = 0; _i < district.length; _i++) {
          var districtData = district[_i];
          result.push({
            ward_id: districtData.ward_id,
            ward_name: districtData.ward_name

          })
          
        }
      
      return { 
        StatusCode: 200, 
        Message: 'Success',
        Data:result
      }
  }

  async getDistrict(province_id:number): Promise<any> {
    const district: MDistrict[] = await this._MDistrictRepository.find({ where: { province_id: province_id }, order: {"district_name":"ASC"}});
  
    if (!district) {
      throw new HttpException(VndErrorType.USER_NOT_FOUND, 402);
    }

    let result = [];
        for (var _i = 0; _i < district.length; _i++) {
          var districtData = district[_i];
          result.push({
            district_id: districtData.district_id,
            district_name: districtData.district_name

          })
          
        }
      
      return { 
        StatusCode: 200, 
        Message: 'Success',
        Data:result
      }
  }

}
