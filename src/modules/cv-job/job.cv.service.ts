import { Injectable, BadRequestException,
    HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user-account/user.entity';
import { UserRepository } from '../user-account/repositories/user.repositry'; 
import { UserProfileRepository } from '../user-account/repositories/user.profile.repository'; 
import { UserProfileDto } from '../user-auth/dto';
import { VndErrorType } from 'src/shared/error/constant.error';
import { S3 } from "aws-sdk";
import { join } from 'path';
import { createWriteStream } from 'fs';
import { Configuration } from '../../config/config.keys';
import { ConfigService } from 'src/config/config.service';
import { UserProfile } from '../user-account/user.profile.entity';
import { JobCareer } from './job.career.entity';
import { JobCareerRepository } from './repositories/job.career.repository';
import { JobCVRepository } from './repositories/job.cv.repositories';
import { CVJobEntity } from './job.cv.entity';
import { createCvDto, updateProfileCvDto } from './dto/job.cv.dto';

const FormData = require("form-data")
  
  
  @Injectable()
  export class jobCvService {
    private s3: any;
    constructor(
      @InjectRepository(UserRepository)
      private readonly _userRepository: UserRepository,
      private readonly _userProfileRepository: UserProfileRepository,
      private readonly configService: ConfigService,
      private readonly _JobCareerRepository: JobCareerRepository,
      private readonly _JobCVRepository:JobCVRepository,
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
    async getCareer(id: string): Promise<any> {

      // Check into DB
      const jobCareer: JobCareer[] = await this._JobCareerRepository.find();
      if (!jobCareer) {
        throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402);
      } 
      return { 
        StatusCode: 200, 
        Message: 'Success',
        Data:jobCareer
      };
    }

    async getListProfileCV(user_id: string): Promise<any> {
      try{

        // Check into DB
        const cVJobEntity: CVJobEntity[] = await this._JobCVRepository.find({ where: { user_id: user_id }});
        if (!cVJobEntity) {
          throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402);
        }

        let result = [];
        for (var _i = 0; _i < cVJobEntity.length; _i++) {
          var jobcv = cVJobEntity[_i];
          result.push({
            cv_id: jobcv.id,
            cv_name: jobcv.cv_name,
            avatar_url: jobcv.avatar_url,
            created_date: jobcv.created_date

          })
          
        }
      
      return { 
        StatusCode: 200, 
        Message: 'Success',
        Data:result
      }
      }
      catch(error){
        VndErrorType.FAIL_TO_GET_DATA['Message'] = error.message;
        throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402)
      }
    }
  
    async profileCv(user_id:string, cv_id: string): Promise<any> {
      try{
        const jobcv:CVJobEntity = await this._JobCVRepository.findOne({where: { id: cv_id }});
        if (!jobcv) {
          return {
            StatusCode: 200, 
            Message: 'Success',
            Data: null
          };
        } 

        return { 
          StatusCode: 200, 
          Message: 'Success',
          Data: {"user_id":user_id,
                "cv_id":cv_id,
                "cv_name": jobcv.cv_name,
                "full_name": jobcv.full_name,
                "birthday": jobcv.birthday,
                "gender": jobcv.gender,
                "phone_number": jobcv.phone_number,
                "email": jobcv.email,
                "address": jobcv.address,
                "education": jobcv.education,
                "experience": jobcv.experience,
                "skills": jobcv.skills,
                "career_name": jobcv.jobCarrer.career_name,
                "career_id": jobcv.career_id,
                "avatar_url": jobcv.avatar_url}
        };
      }
      catch(error){
        VndErrorType.FAIL_TO_GET_DATA['Message'] = error.message;
        console.log('--------------jobcv------------', VndErrorType.FAIL_TO_GET_DATA['Message'] = error.message)
        throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402)
      }
      
    }
  
    async uploadAvatar(file: Express.Multer.File, user_id: string): Promise<any> {
      try {

        const filename = user_id + "_" +  file.originalname
        const data = await this.uploadS3(file, user_id, filename);
        
        return {
          StatusCode: 200, 
          Message: 'Success',
          Data: {"user_id":user_id,
                "avatar_url": data.Location}
        };
      } catch (error) {
        VndErrorType.USER_UPLOAD_FAIL['Message'] = error.message;
        throw new HttpException(VndErrorType.USER_UPLOAD_FAIL, 402)
      }
    }

    async getdata(user_id:string): Promise<any> {
      try{
        const user: User = await this._userRepository.findOne({where: { id: user_id }});
        if (!user) {
          throw new HttpException(VndErrorType.USER_NOT_FOUND, 402)
        }

        return { 
          StatusCode: 200, 
          Message: 'Success',
          Data: {"user_id":user_id,
                "full_name": user.Profile.full_name,
                "birthday": user.Profile.birthday,
                "phone_number": user.username,
                "image_face_url": user.Profile.image_profile_url

              }
        };
   
      }
      catch(error){
        VndErrorType.FAIL_TO_GET_DATA['Message'] = error.message
        return VndErrorType.FAIL_TO_GET_DATA;
      }
      
    }

    async createCv(user_id:string, body:createCvDto): Promise<any> {
      try{
          const jobCV = new CVJobEntity()
          jobCV.cv_name = body.cv_name;
          jobCV.full_name = body.full_name;
          jobCV.birthday = body.birthday;
          jobCV.gender = body.gender;
          jobCV.phone_number = body.phone_number;
          jobCV.email = body.email;
          jobCV.address = body.address;
          jobCV.education = body.education;
          jobCV.skills = body.skills;
          jobCV.experience = body.experience;
          jobCV.career_id = body.career_id;
          jobCV.user_id = user_id;
          jobCV.avatar_url = body.avatar_url;
          jobCV.created_date = new Date();
          jobCV.save()

          return { 
            StatusCode: 200, 
            Message: 'Success',
            Data: {"user_id":user_id
                }
          };
   
      }
      catch(error){
        VndErrorType.FAIL_CREATE_CV['Message'] = error.message
        return VndErrorType.FAIL_CREATE_CV;
      }
      
    }

    async updateProfileCV(user_id: string, body:updateProfileCvDto): Promise<any> {
      try {
          await this._JobCVRepository.update(body.id, {...body})

        
          return {
            StatusCode: 200, 
            Message: 'Success',
            Data: {"user_id":user_id}
          };
      } catch (error) {
        VndErrorType.FAIL_UPDATE_CV['Message'] = error.message
        return VndErrorType.FAIL_UPDATE_CV;
      }
    }

    async deleteProfileCV(user_id: string, cv_id:string): Promise<any> {
      try {

          const jobcv:CVJobEntity = await this._JobCVRepository.findOne({where: { id: cv_id }});
          if (!jobcv) {
            return VndErrorType.CV_NOT_FOUND;
          }

          await this._JobCVRepository.delete({id: cv_id})

        
          return {
            StatusCode: 200, 
            Message: 'Success',
            Data: {"user_id":user_id}
          };
      } catch (error) {
        VndErrorType.FAIL_DELETE_CV['Message'] = error.message
        return VndErrorType.FAIL_DELETE_CV;
      }
    }
}
  
  