import { Injectable, BadRequestException,
  HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity'
import { UserRepository } from './repositories/user.repositry';
import { UserProfileRepository } from './repositories/user.profile.repository';
import { UserProfileDto } from '../user-auth/dto';
import { VndErrorType } from 'src/shared/error/constant.error';
import { S3 } from "aws-sdk";
import { join } from 'path';
import { createWriteStream } from 'fs';
import { Configuration } from '../../config/config.keys';
import { ConfigService } from 'src/config/config.service';
import { EkycService } from './ekyc.service';
import { UserProfile } from './user.profile.entity';
import { UpdateProfileDto } from './dto/user.dto';
import * as QRCode from 'qrcode';
import { LocationService } from '../location/location.service';

const FormData = require("form-data")


@Injectable()
export class UserService {
  private s3: any;
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _userProfileRepository: UserProfileRepository,
    private readonly configService: ConfigService,
    private readonly _ekycService: EkycService,
    private readonly _locationService: LocationService
  ) { 
    this.s3 = new S3({
      region: configService.get(Configuration.AWS_BUCKET_REGION_NAME),
      accessKeyId: configService.get(Configuration.AWS_ACCESS_KEY_ID),
      secretAccessKey: configService.get(Configuration.AWS_SECRET_ACCESS_KEY),
      signatureVersion: 'v4'
  })
    
  }

  async uploadS3(file:any, userid:number, filename: string):Promise<any>{
    const s3Params = {
      Bucket: this.configService.get(Configuration.BUCKET_NAME),
      Body: file.buffer,
      Key: `Image/${userid}/${filename}`,
      ACL: "public-read",
    }
    const data = await this.s3.upload(s3Params).promise();

    console.log('==================================', data)
    return data
  }

  /**
   * Returns a user
   * @param {string} id 
   * @returns 
   */
  async genQrCode(id: number): Promise<any> {
    // Check ID
    if (!id) {
      throw new BadRequestException('id must be sent');
    }    
    
    // Check into DB

    const user: User = await this._userRepository.findOne({where: {id: id}});
    if (!user) {
      throw new HttpException(VndErrorType.USER_NOT_FOUND, 402);
    } 
    console.log('============= start')
    const qr = await QRCode.toDataURL('2929299292992202');
    console.log('================', qr)
    const base64Data = qr.split(',')[1];
    const filename = [...Array(10)]
      .map(() => (~~(Math.random() * 36)).toString(36))
      .join('') + '.jpg';

    console.log('================', filename)
    const buf = Buffer.from(base64Data, 'base64');

    console.log('============================', buf)
    const data = await this.uploadS3(buf.toString('base64'), id, filename);
    await this._userProfileRepository.update(id, {qrcode_url: data.Location})
    return {
      StatusCode: 200, 
      Message: 'Success',
      Data: {"user_id":id,
            "qrcode_url": data.Location}
    }
      
    return user;
  }

  async get(id: string): Promise<User> {
    // Check ID
    if (!id) {
      throw new BadRequestException('id must be sent');
    }    
    
    // Check into DB
    const user: User = await this._userRepository.findOne({where: {id: id}});
    if (!user) {
      throw new HttpException(VndErrorType.USER_NOT_FOUND, 402);
    }    
    return user;
  }


  async updateprofile(user_id:number, body: UpdateProfileDto): Promise<any> {
    try{
      const user: User = await this._userRepository.findOne({where: {id: user_id}});
      if (!user) {
        throw new HttpException(VndErrorType.USER_NOT_FOUND, 402);
      }
      await this._userProfileRepository.update(user_id, {...body})
      return { 
        StatusCode: 200, 
        Message: 'Success',
        Data: {"user_id":user_id}
      };
    }
    catch(error){
      VndErrorType.USER_NOT_FOUND['Message'] = error.message
      throw new HttpException(VndErrorType.USER_NOT_FOUND, 402);
    }
    
  }

  async updateprofilepic(file: Express.Multer.File, user_id: number): Promise<any> {
    try {
      const filename = user_id + '.jpg'
      const data = await this.uploadS3(file, user_id, filename);
      await this._userProfileRepository.update(user_id, {image_profile_url: data.Location})
      return {
        StatusCode: 200, 
        Message: 'Success',
        Data: {"user_id":user_id,
              "photo_url": data.Location}
      };
    } catch (error) {
      VndErrorType.USER_UPLOAD_FAIL['Message'] = error.message
      throw new HttpException(VndErrorType.USER_UPLOAD_FAIL, HttpStatus.BAD_REQUEST);
    }
  }

  async ekycphoto(file:any, upload_type: string, user_id: number): Promise<any> {
    console.log(file)
    
    const userProfile: UserProfile = await this._userProfileRepository.findOne({ where: { id: user_id}});
    const imagename = user_id + '_' + upload_type +  "_" + file.originalname;
    const Stream = createWriteStream(join('src/assets',`/${imagename}`)).write(file.buffer);

    const type = parseInt(upload_type)

    try {
      
      const data = await this.uploadS3(file, user_id, imagename);
      if (6 === type){
        
        const token = await this._ekycService.ApiGetTokenAi()
        console.log('token', token)
        var hash_md5_5 = await this._ekycService.ApiUploadFile(token, user_id, imagename, type)
        await this._userProfileRepository.update(user_id, {image_face_url: data.Location});
        
        return {
          StatusCode: 200, 
          Message: 'Success',
          Data: {"user_id":user_id}
        };
      }
  
      else if (type === 0 || type === 2 || type === 4){

        const token = await this._ekycService.ApiGetTokenAi()
        var hash_md5_5 = await this._ekycService.ApiUploadFile(token, user_id, imagename, type)
        await this._userProfileRepository.update(user_id, {image_cccd_front_url: data.Location});
        return {
          StatusCode: 200, 
          Message: 'Success',
          Data: {"user_id":user_id}
        };
      }
  
      else if (type === 1 || type === 3 || type === 5){
        
        const token = await this._ekycService.ApiGetTokenAi()
        var hash_md5_5 = await this._ekycService.ApiUploadFile(token, user_id, imagename, type)
        await this._userProfileRepository.update(user_id, {image_cccd_back_url: data.Location});
        return {
          StatusCode: 200, 
          Message: 'Success',
          Data: {"user_id":user_id}
        };

      }
      
    } catch (error) {
      VndErrorType.USER_UPLOAD_FAIL['Message'] = error.message
      throw new HttpException(VndErrorType.USER_UPLOAD_FAIL, HttpStatus.BAD_REQUEST);
    }

  }
  async checkekyc(user_id: number):Promise<any> {
        const token = await this._ekycService.ApiGetTokenAi()
        const userProfile: UserProfile = await this._userProfileRepository.findOne({ where: { id: user_id}});
        return await this._ekycService.ApiEKYC(token, user_id, userProfile, this._userProfileRepository)

  }

  async getdata(user_id:number): Promise<any> {
    try{
      const user: User = await this._userRepository.findOne({where: {id: user_id}});
      if (!user) {
        throw new HttpException(VndErrorType.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }
      const career = user.Profile.career_id === null ? null : user.Profile.jobCareer;
      const province = user.Profile.province_id === null ? null : user.Profile.mProvince
      const district = user.Profile.district_id === null ? null : user.Profile.mDistrict;
      const ward = user.Profile.ward_id === null ? null : user.Profile.mWard;

      if (user.Profile.ekyc === true){
        
        return { 
          StatusCode: 200, 
          Message: 'Success',
          Data: {"user_id":user_id,
                "ekyc": user.Profile.ekyc,
                "full_name": user.Profile.full_name,
                "birthday": user.Profile.birthday,
                "address": user.Profile.address,
                "permanent_address": user.Profile.permanent_address,
                "email": user.Profile.email,
                "province": province,
                "district": district,
                "ward": ward,
                "gender": user.Profile.gender,
                "career":  career,
                "hometown": user.Profile.hometown,
                "cccd": user.Profile.cccd,
                "cccd_date": user.Profile.cccd_date,
                "cccd_location": user.Profile.cccd_location,
                "phone_number": user.username,
                "image_face_url": user.Profile.image_profile_url
  
              }
        };

      }
      else{
        return { 
          StatusCode: 200, 
          Message: 'Success',
          Data: {"user_id":user_id,
                "ekyc": user.Profile.ekyc,
                "full_name": user.Profile.full_name,
                "phone_number": user.username,
                "birthday": user.Profile.birthday,
                "address": user.Profile.address,
                "email": user.Profile.email,
                "province": province,
                "district": district,
                "ward": ward,
                "gender": user.Profile.gender,
                "career":  career
  
              }
        };
      }

      
 
    }
    catch(error){
      VndErrorType.FAIL_TO_GET_DATA['Message'] = error.message
      throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, HttpStatus.BAD_REQUEST);
    }
  }
}
