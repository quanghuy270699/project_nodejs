import { Injectable, BadRequestException,
    HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Any } from "typeorm";
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
import { JobCareer } from './career.job.entity';
import { JobCareerRepository } from './repositories/career.job.repository';
import { JobCVRepository } from './repositories/cv.job.repositories';
import { CVEntity } from './cv.entity';
import { createCvDto, createSubmitCvDto, updateProfileCvDto } from './dto/cv.dto';
import { CvJob } from './cv.job.entity';
import { CVJobRepository } from './repositories/cv.send.repository';
import { RecruitmentRepository } from '../recruitment/repositories/recruitment.repository';
import { RecruitmentEntity } from '../recruitment/recruitment.entity';
import { ListJobDto } from '../recruitment/dto/recruitment.dto';
import {Like} from "typeorm";
const FormData = require("form-data")
import { Logger, Logger as TypeOrmLogger, QueryRunner } from    'typeorm';
  
  
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
      private readonly _CVJobRepository:CVJobRepository,
      private readonly _RecruitmentRepository: RecruitmentRepository
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
        Key: `Image/${userid.toString()}/${filename}`,
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
    async getCareer(id: number): Promise<any> {

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

    async getListProfileCV(user_id: number): Promise<any> {
      try{

        // Check into DB
        const cVJobEntity: CVEntity[] = await this._JobCVRepository.find({ where: { user_id: user_id },order: {created_date: "DESC"}});
        if (!cVJobEntity) {
          throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402);
        }

        let result = [];
        for (var _i = 0; _i < cVJobEntity.length; _i++) {
          var jobcv = cVJobEntity[_i];
          const day = jobcv.created_date.getDate() < 10 ? "0" + jobcv.created_date.getDate(): jobcv.created_date.getDate()
          const month = (jobcv.created_date.getMonth() + 1) < 10 ? "0" + (jobcv.created_date.getMonth() + 1): (jobcv.created_date.getMonth() + 1)
          const year = jobcv.created_date.getFullYear()

          const created_date = day + '/' + month +'/' + year;
          result.push({
            full_name: jobcv.full_name,
            phone_number: jobcv.phone_number,
            email: jobcv.email,
            career: jobcv.jobCareer,
            cv_id: jobcv.id,
            cv_name: jobcv.cv_name,
            avatar_url: jobcv.avatar_url,
            created_date: created_date

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


    async getListCVByPhone(phone_number: number): Promise<any> {
      try{

        // Check into DB
        const cVJobEntity: CVEntity[] = await this._JobCVRepository.find({ where: { user_id: phone_number },order: {created_date: "DESC"}});
        if (!cVJobEntity) {
          throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402);
        }

        let result = [];
        for (var _i = 0; _i < cVJobEntity.length; _i++) {
          var jobcv = cVJobEntity[_i];
          const day = jobcv.created_date.getDate() < 10 ? "0" + jobcv.created_date.getDate(): jobcv.created_date.getDate()
          const month = (jobcv.created_date.getMonth() + 1) < 10 ? "0" + (jobcv.created_date.getMonth() + 1): (jobcv.created_date.getMonth() + 1)
          const year = jobcv.created_date.getFullYear()

          const created_date = day + '/' + month +'/' + year;
          result.push({
            full_name: jobcv.full_name,
            phone_number: jobcv.phone_number,
            email: jobcv.email,
            career: jobcv.jobCareer,
            cv_id: jobcv.id,
            cv_name: jobcv.cv_name,
            avatar_url: jobcv.avatar_url,
            created_date: created_date

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

    async listSubmitCV(user_id: number): Promise<any> {
      try{

        // Check into DB
        const cvjob: CvJob[] = await this._CVJobRepository.find({ where: { user_id: user_id }});
        if (!cvjob) {
          throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402);
        }

        let result = [];
        for (var _i = 0; _i < cvjob.length; _i++) {
          var cvsubmit = cvjob[_i];
          result.push({

            cv_id: cvsubmit.cv_id,
            title: cvsubmit.Recruitment.title,
            province: cvsubmit.Recruitment.province || null,
            district: cvsubmit.Recruitment.district || null,
            salary: cvsubmit.Recruitment.salary || null,
            avatar_url: cvsubmit.Recruitment.jobCompany.logo_url,
            created_date: cvsubmit.Recruitment.expired_date
            

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
  
    async profileCv(user_id:number, cv_id: number): Promise<any> {
      try{
        const jobcv:CVEntity = await this._JobCVRepository.findOne({where: { id: cv_id }});
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
                "career": jobcv.jobCareer,
                "avatar_url": jobcv.avatar_url}
        };
      }
      catch(error){
        VndErrorType.FAIL_TO_GET_DATA['Message'] = error.message;
        console.log('--------------jobcv------------', VndErrorType.FAIL_TO_GET_DATA['Message'] = error.message)
        throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402)
      }
      
    }
  
    async uploadAvatar(file: Express.Multer.File, user_id: number): Promise<any> {
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

    async getdata(user_id:number): Promise<any> {
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
        throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402);
      }
      
    }

    async createCv(user_id:number, body:createCvDto): Promise<any> {
      try{
          const jobCV = new CVEntity()
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
          await jobCV.save()


          return { 
            StatusCode: 200, 
            Message: 'Success',
            Data: {"user_id":user_id
                }
          };
   
      }
      catch(error){
        VndErrorType.FAIL_CREATE_CV['Message'] = error.message
        throw new HttpException(VndErrorType.FAIL_CREATE_CV, 402);
      }
      
    }

    async getListJob(user_id: number, body:ListJobDto): Promise<any> {
      try{

        const recruitment: RecruitmentEntity[] = await this._RecruitmentRepository.find(
          {
            where: {
            job_type: body.job_type === 0 ?  Like('%%') : body.job_type,
            require_time: body.time_id === 0 ? Like('%%') : body.time_id,
            career_id: body.career_id === 0 ? Like('%%') : body.career_id,
            province_id: body.province_id ===0 ? Like('%%') : body.province_id,
            district_id: body.district_id === 0 ? Like('%%') : body.district_id,
            salary: body.salary_id === 0 ? Like('%%') : body.salary_id},
          skip: body.pageIndex, take: body.pageSize, order: {created_date: "DESC"}
          });

        
        
        if (!recruitment) {
          throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402);
        }
     
        let result = [];
        for (var _i = 0; _i < recruitment.length; _i++) {
          var recruitmentData = recruitment[_i];
          result.push({
            job_id: recruitmentData.id,
            province: recruitmentData.province,
            district: recruitmentData.district,
            career: recruitmentData.jobCareer,
            logo_url: recruitmentData.jobCompany.logo_url,
            title: recruitmentData.title,
            salary: recruitmentData.salary,
            job_type: recruitmentData.job_type,
            expired_date: recruitmentData.expired_date

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

    async submitCV(user_id:number, body:createSubmitCvDto): Promise<any> {
      try{
          const cvjob = new CvJob()
          cvjob.cv_id = body.cv_id;
          cvjob.job_id = body.job_id;
          cvjob.user_id = user_id;
          cvjob.status = 0;
          cvjob.created_date = new Date();
          await cvjob.save()


          return { 
            StatusCode: 200, 
            Message: 'Success',
            Data: {"user_id":user_id}
          };
   
      }
      catch(error){
        VndErrorType.FAIL_SUBMIT_CV['Message'] = error.message
        throw new HttpException(VndErrorType.FAIL_SUBMIT_CV, 402);
      }
      
    }

    async updateProfileCV(user_id: number, body:updateProfileCvDto): Promise<any> {
      try {
          await this._JobCVRepository.update(body.id, {cv_name: body.cv_name,
            full_name: body.full_name,
            birthday: body.birthday,
            gender: body.gender,
            phone_number: body.phone_number,
            email: body.email,
            address: body.address,
            education: body.education,
            experience: body.experience,
            skills: body.skills,
            career_id: body.career_id,
            avatar_url: body.avatar_url})

        
          return {
            StatusCode: 200, 
            Message: 'Success',
            Data: {"user_id":user_id}
          };
      } catch (error) {
        VndErrorType.FAIL_UPDATE_CV['Message'] = error.message
        throw new HttpException(VndErrorType.FAIL_UPDATE_CV, 402);
      }
    }

    async deleteProfileCV(user_id: number, cv_id:number): Promise<any> {
      try {

          const jobcv:CVEntity = await this._JobCVRepository.findOne({where: { id: cv_id }});
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
        throw new HttpException(VndErrorType.FAIL_DELETE_CV, 402);
      }
    }
}
  
  