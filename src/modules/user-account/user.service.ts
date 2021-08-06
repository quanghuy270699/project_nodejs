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


const FormData = require("form-data")


@Injectable()
export class UserService {
  private s3: any;
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _userProfileRepository: UserProfileRepository,
    private readonly configService: ConfigService,
    private readonly _ekycService: EkycService
  ) { 
    this.s3 = new S3({
      region: configService.get(Configuration.AWS_BUCKET_REGION_NAME),
      accessKeyId: configService.get(Configuration.AWS_ACCESS_KEY_ID),
      secretAccessKey: configService.get(Configuration.AWS_SECRET_ACCESS_KEY),
      signatureVersion: 'v4'
  })
    
  }

  async uploadS3(file:any, userid:string, filename: string):Promise<any>{
    const s3Params = {
      Bucket: this.configService.get(Configuration.BUCKET_NAME),
      Body: file.buffer,
      Key: `Image/${userid}/${filename}`,
      ACL: "public-read",
    }
    const data = await this.s3.upload(s3Params).promise();

    // console.log('==================================', data)
    return data
  }

  /**
   * Returns a user
   * @param {string} id 
   * @returns 
   */
  async get(id: string): Promise<User> {
    // Check ID
    if (!id) {
      throw new BadRequestException('id must be sent');
    }    
    
    // Check into DB
    const user: User = await this._userRepository.findOne(id);
    if (!user) {
      throw new HttpException(VndErrorType.USER_NOT_FOUND, 402);
    }    
    return user;
  }

  async updateprofile(user_id:string, body: UpdateProfileDto): Promise<any> {
    try{
      const user: User = await this._userRepository.findOne(user_id);
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

  async updateprofilepic(file: Express.Multer.File, user_id: string): Promise<any> {
    try {
      const filename = user_id + '.jpg'
      const data = await this.uploadS3(file, user_id, filename);
      await this._userProfileRepository.update(user_id, {image_profile_url: data.Location})
      return {
        StatusCode: 200, 
        Message: 'Success',
        Data: {"user_id":user_id}
      };
    } catch (error) {
      VndErrorType.USER_UPLOAD_FAIL['Message'] = error.message
      throw new HttpException(VndErrorType.USER_UPLOAD_FAIL, HttpStatus.BAD_REQUEST);
    }
  }

  async ekycphoto(file:any, upload_type: string, user_id: string): Promise<any> {
      
      const userProfile: UserProfile = await this._userProfileRepository.findOne({ where: { id: user_id}});
      const filetype = '.jpg'
      const imagename = user_id + '_' + upload_type +  "_" + file.originalname;
      const Stream = createWriteStream(join('src/assets',`/${imagename}`)).write(file.buffer);

      
      try {

        const data = await this.uploadS3(file, user_id, imagename);
        if ("selfie" === upload_type){
          const type = "5";
          const token = await this._ekycService.ApiGetTokenAi()
          var hash_md5_5 = await this._ekycService.ApiUploadFile(token, user_id, imagename, type)
          await this._userProfileRepository.update(user_id, {image_face_url: data.Location});
          
          return {
            StatusCode: 200, 
            Message: 'Success',
            Data: {"user_id":user_id}
          };
        }
    
        else if ("front_id_card" === upload_type){
          // console.log('------cccd------', userProfile.cccd)


  
          var type = "0";
     
          const token = await this._ekycService.ApiGetTokenAi()
          var hash_md5_5 = await this._ekycService.ApiUploadFile(token, user_id, imagename, type)
          await this._userProfileRepository.update(user_id, {image_cccd_front_url: data.Location});
          return {
            StatusCode: 200, 
            Message: 'Success',
            Data: {"user_id":user_id}
          };
        }
    
        else if ("back_id_card" === upload_type){

          var type = "1";
          
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
  async checkekyc(user_id: string):Promise<any> {
        const token = await this._ekycService.ApiGetTokenAi()
        const userProfile: UserProfile = await this._userProfileRepository.findOne({ where: { id: user_id}});
        return await this._ekycService.ApiEKYC(token, user_id, userProfile, this._userProfileRepository)

  }

  async getdata(user_id:string): Promise<any> {
    try{
      const user: User = await this._userRepository.findOne(user_id);
      if (!user) {
        throw new HttpException(VndErrorType.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);;
      }


      if (user.Profile.ekyc === true){
        return { 
          StatusCode: 200, 
          Message: 'Success',
          Data: {"user_id":user_id,
                "ekyc": user.Profile.ekyc,
                "full_name": user.Profile.full_name,
                "birthday": user.Profile.birthday,
                "address": user.Profile.address,
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
  
              }
        };
      }

      
 
    }
    catch{
      throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, HttpStatus.BAD_REQUEST);
    }
  }
}
