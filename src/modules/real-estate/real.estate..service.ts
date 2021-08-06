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

  async uploadS3(file:any, userid:string, filename: string, filetype:string):Promise<any>{
    const s3Params = {
      Bucket: this.configService.get(Configuration.BUCKET_NAME),
      Body: file.buffer,
      Key: `Image/${userid}/${filename}${filetype}`,
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
  async get(id: string): Promise<User> {
    // Check ID
    if (!id) {
      throw new BadRequestException('id must be sent');
    }    
    
    // Check into DB
    const user: User = await this._userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }    
    return user;
  }

  async updateprofile(user_id:string, body: UserProfileDto): Promise<any> {
    try{
      const user: User = await this._userRepository.findOne(user_id);
      if (!user) {
        return VndErrorType.USER_NOT_FOUND;
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
      return VndErrorType.USER_NOT_FOUND;
    }
    
  }

  async updateprofilepic(file: Express.Multer.File, user_id: string): Promise<any> {
    try {
      const filename = user_id;
      const filetype = '.jpg'
      const data = await this.uploadS3(file, user_id, filename, filetype);
      
      await this._userProfileRepository.update(user_id, {image_profile_url: data.Location})
      return {
        StatusCode: 200, 
        Message: 'Success',
        Data: {"user_id":user_id}
      };
    } catch (error) {
      throw new HttpException('Error uploading media', HttpStatus.BAD_REQUEST);;
    }
  }

  async ekycphoto(file: Express.Multer.File, uploadtype: string, user_id: string, cccd_type: boolean): Promise<any> {
      const readStream = file.buffer
      
      const userProfile: UserProfile = await this._userProfileRepository.findOne({ where: { id: user_id}});
      const filetype = '.jpg'
      const filename = user_id + filetype
      const Stream = createWriteStream(join('src/assets',`/${filename}`)).write(file.buffer);
      
      try {
        const imagename = user_id + '_' + uploadtype;
        const data = await this.uploadS3(file, user_id, imagename, filetype);
        if ("selfie" === uploadtype){
          const type = "5";
          const token = await this._ekycService.ApiGetTokenAi()
          var hash_md5_5 = await this._ekycService.ApiUploadFile(token, user_id, filename, type)
          await this._userProfileRepository.update(user_id, {image_face_url: data.Location});
          
          return {
            StatusCode: 200, 
            Message: 'Success',
            Data: {"user_id":user_id}
          };
        }
    
        else if ("front_card" === uploadtype){
          console.log('------cccd------', userProfile.cccd)

          if (cccd_type === true){
            var type = "2";

          }
          else{
            var type = "0";
          }
          const token = await this._ekycService.ApiGetTokenAi()
          var hash_md5_5 = await this._ekycService.ApiUploadFile(token, user_id, filename, type)
          await this._userProfileRepository.update(user_id, {image_cccd_front_url: data.Location});
          return {
            StatusCode: 200, 
            Message: 'Success',
            Data: {"user_id":user_id}
          };
        }
    
        else if ("back_card" === uploadtype){
          if (cccd_type === true){
            var type = "3";
          }
          else{
            var type = "1";
          }
          const token = await this._ekycService.ApiGetTokenAi()
          var hash_md5_5 = await this._ekycService.ApiUploadFile(token, user_id, filename, type)
          await this._userProfileRepository.update(user_id, {image_cccd_back_url: data.Location});
          return {
            StatusCode: 200, 
            Message: 'Success',
            Data: {"user_id":user_id}
          };

        }
        
      } catch (error) {
          console.log(error);
          throw error;
      }

  }
  async checkekyc(user_id: string):Promise<any> {
        const token = await this._ekycService.ApiGetTokenAi()
        const userProfile: UserProfile = await this._userProfileRepository.findOne({ where: { id: user_id}});
        const result = await this._ekycService.ApiEKYC(token, user_id)

        if (result['StatusCode'] === 201){
          return VndErrorType.USER_FRONT_UNDETECTED;
        }
        else if (result['StatusCode'] === 203){
          return VndErrorType.USER_BACK_UNDETECTED;
        }
        else if (result['StatusCode'] === 205){
          return VndErrorType.USER_SELFIE_UNDETECTED;
        }
        else if (result['StatusCode'] === 204){
          return VndErrorType.USER_FRONT_BACK_UNDETECTED;
        }
        else if (result['StatusCode'] === 206){
          return VndErrorType.USER_FRONT_SELFIE_UNDETECTED;
        }
        else if (result['StatusCode'] === 208){
          return VndErrorType.USER_SELFIE_BACK_UNDETECTED;
        }
        else if (result['StatusCode'] === 209){
          return VndErrorType.USER_ALL_INFORMATION_UNDETECTED;
        }
        else if (result['Message'] === "more_face"){
          return VndErrorType.PERSON_MORE_THAN_ONE_IN_IMAGE;
        }
        else if (null !== userProfile.cccd){
          if (result['Data']['id_number'] !== userProfile.cccd){
            return VndErrorType.USER_ID_NUMBERS_UNMATCHED;
          }  
        }
        else if (result['Data']['face_compare'] !== "True" ){
          return VndErrorType.USER_FACES_UNMATCHED;
        }

        await this._userProfileRepository.update(user_id, 
          {cccd: result['Data']['id_number'],
          cccd_location: result['Data']['location'],
          hometown: result['Data']['hometown'],
          address: result['Data']['address'],
          cccd_date: result['Data']['date']})

        return {
          StatusCode: 200, 
          Message: 'Success',
          Data: {"user_id":user_id,
                "cccd_data": result['Data']}
        };
    }
    catch(error){
      throw(error);
    }
  }

