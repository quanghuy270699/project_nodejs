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
import { CreateProfileDto, CreateRecruitmentDto, updateProfileCvDto } from './dto/recruitment.dto';
import { JobCareerRepository } from '../cv/repositories/career.job.repository';
import { JobCareer } from '../cv/career.job.entity';
import { JobCompany } from './job.company.entity';
import { JobCompanyRepository } from './repositories/job.company.repositories';
import { RecruitmentRepository } from './repositories/recruitment.repository';
import { RecruitmentEntity } from './recruitment.entity';
import { FieldsCareer } from './fields.career.entity';
import { FieldsCareerRepository } from './repositories/fields.career.repository';
import { NumberCapability } from 'aws-sdk/clients/sns';
const FormData = require("form-data")
  
  
  @Injectable()
  export class recruitmentService {
    private s3: any;
    constructor(
      @InjectRepository(UserRepository)
      private readonly _userRepository: UserRepository,
      private readonly _userProfileRepository: UserProfileRepository,
      private readonly configService: ConfigService,
      private readonly _JobCareerRepository: JobCareerRepository,
      private readonly _JobCompanyRepository: JobCompanyRepository,
      private readonly _RecruitmentRepository:RecruitmentRepository,
      private readonly _FieldsCareerRepositor: FieldsCareerRepository
      
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
    async getfieldsCareer(id: number): Promise<any> {

      // Check into DB
      const fieldCareer: FieldsCareer[] = await this._FieldsCareerRepositor.find();
      if (!fieldCareer) {
        throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402);
      }    
      return { 
        StatusCode: 200, 
        Message: 'Success',
        Data:fieldCareer
      };
    }


    async uploadphoto(file: Express.Multer.File, user_id: number, upload_type:string): Promise<any> {
      try {
        const filename = user_id + '_' + upload_type + '_' + file.originalname;
        const data = await this.uploadS3(file, user_id, filename);
        
        return {
          StatusCode: 200, 
          Message: 'Success',
          Data: {"user_id":user_id,
                "photo_url": data.Location}
        };
      } catch (error) {
        VndErrorType.USER_UPLOAD_FAIL['Message'] = error.message;
        throw new HttpException(VndErrorType.USER_UPLOAD_FAIL, 402)
      }
    }

    async createProfileCompany(user_id:number, body:CreateProfileDto): Promise<any> {
      const jobcompany: JobCompany = await this._JobCompanyRepository.findOne({where: {user_id:user_id}})
      if (jobcompany !== undefined){
        await this._JobCompanyRepository.update(user_id, {...body});
        return { 
          StatusCode: 200, 
          Message: 'Success',
          Data: {"user_id":user_id,
              }
        };
      }
      else{
        try{
          const recruitment = new JobCompany()
          recruitment.company_name = body.company_name;
          recruitment.cover_url = body.cover_url;
          recruitment.logo_url = body.logo_url;
          recruitment.size = body.size;
          recruitment.description = body.description;
          recruitment.phone_number = body.phone_number;
          recruitment.email = body.email;
          recruitment.location = body.location;
          recruitment.intro = [body.company_name, body.tax_id, body.fields_career_name, body.size];
          recruitment.core_values = body.core_values;
          recruitment.tax_id = body.tax_id;
          recruitment.fields_career = body.fields_career_id;
          recruitment.user_id = user_id;
          recruitment.website = body.website;
          recruitment.created_date = new Date();
          recruitment.save()
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
      
    }

    async myCompany(user_id: number): Promise<any> {
      try {
          const jobCompany: JobCompany = await this._JobCompanyRepository.findOne({where: {user_id: user_id}})
          if (!jobCompany) {
            return {
              StatusCode: 200, 
              Message: 'Success',
              Data: null
            };
          } 

          return {
            StatusCode: 200, 
            Message: 'Success',
            Data: {
              "company_name": jobCompany.company_name,
              "user_id": user_id,
              "cover_url": jobCompany.cover_url,
              "logo_url": jobCompany.logo_url,
              "tax_id": jobCompany.tax_id,
              "description": jobCompany.description,
              "location": jobCompany.location,
              "size": jobCompany.size,
              "fields_career": jobCompany.FieldsCareer.career_name,
              "intro": jobCompany.intro,
              "core_values": jobCompany.core_values,
              "website": jobCompany.website,
              "email": jobCompany.email,
              "phone_number": jobCompany.phone_number,
              
            }
          };
      } catch (error) {
        VndErrorType.FAIL_TO_GET_DATA['Message'] = error.message
        return VndErrorType.FAIL_TO_GET_DATA;
      }
    }

    async companyProfile(company_id: number): Promise<any> {
      try {
          const jobCompany: JobCompany = await this._JobCompanyRepository.findOne({where: {id: company_id}})
          if (!jobCompany) {
            return {
              StatusCode: 200, 
              Message: 'Success',
              Data: null
            };
          } 

          return {
            StatusCode: 200, 
            Message: 'Success',
            Data: {
              "company_name": jobCompany.company_name,
              // "user_id": user_id,
              "cover_url": jobCompany.cover_url,
              "logo_url": jobCompany.logo_url,
              "tax_id": jobCompany.tax_id,
              "description": jobCompany.description,
              "location": jobCompany.location,
              "size": jobCompany.size,
              "fields_career": jobCompany.FieldsCareer.career_name,
              "intro": jobCompany.intro,
              "core_values": jobCompany.core_values,
              "website": jobCompany.website,
              "email": jobCompany.email,
              "phone_number": jobCompany.phone_number,
              
            }
          };
      } catch (error) {
        VndErrorType.FAIL_TO_GET_DATA['Message'] = error.message
        return VndErrorType.FAIL_TO_GET_DATA;
      }
    }

    async createNewRecruitment(user_id:number, body:CreateRecruitmentDto): Promise<any> {

        try{

          console.log('-------------', body)
          const recruitment = new RecruitmentEntity()
          recruitment.title = body.title;
          recruitment.career_id = body.job_career_id;
          recruitment.description = body.description;
          recruitment.level_id = body.level_id;
          recruitment.require_amount = body.require_amount;
          recruitment.require_degree = body.require_degree;
          recruitment.require_experience = body.require_experience;
          recruitment.require_gender = body.require_gender;
          recruitment.require_time = body.require_time;
          recruitment.require_age_start = body.require_age_start;
          recruitment.require_age_end = body.require_age_end;
          recruitment.user_id = user_id;
          recruitment.job_type = body.job_type;
          recruitment.employee_benefits = body.employee_benefits;
          recruitment.salary = body.salary;
          recruitment.expired_date = body.expired_date;
          recruitment.district_id = body.district_id;
          recruitment.province_id = body.province_id;
          recruitment.created_date = new Date();
          recruitment.posted_date = new Date();
          
          recruitment.save()
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

    async newsRecruitment(user_id:number, recruitment_id:number): Promise<any> {

      try{
        const recruitment: RecruitmentEntity = await this._RecruitmentRepository.findOne({where: {id: recruitment_id}})
          if (!recruitment) {
            return {
              StatusCode: 200, 
              Message: 'Success',
              Data: null
            };
          }
        
        return { 
          StatusCode: 200, 
          Message: 'Success',
          Data: {
            job_id: recruitment.id,
            title: recruitment.title,
            user_id: recruitment.user_id,
            level_id: recruitment.level_id,
            career: recruitment.jobCareer,
            description: recruitment.description,
            require_degree: recruitment.require_degree,
            require_amount: recruitment.require_amount,
            require_age_start: recruitment.require_age_start,
            require_age_end: recruitment.require_age_end,
            require_experience: recruitment.require_experience,
            employee_benefits: recruitment.employee_benefits,
            require_time: recruitment.require_time,
            salary: recruitment.salary,
            expired_date: recruitment.expired_date,
            province: recruitment.province,
            district: recruitment.district,
            cover_url: recruitment.jobCompany.cover_url,
            location: recruitment.jobCompany.location,
            log_url: recruitment.jobCompany.logo_url,
            website: recruitment.jobCompany.website,
            phone_number: recruitment.jobCompany.phone_number,
            email: recruitment.jobCompany.email,



          }
        };
      }
      catch(error){
        VndErrorType.FAIL_TO_GET_DATA['Message'] = error.message
        return VndErrorType.FAIL_TO_GET_DATA;
      }
    
    }

    async getListNewsRecruitment(user_id: number, pageIndex: number, pageSize: number): Promise<any> {
      try{

        // Check into DB
        const recruitment: RecruitmentEntity[] = await this._RecruitmentRepository.find({ where: { user_id: user_id }, skip: pageIndex, take: pageSize});
        if (!recruitment) {
          throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402);
        }
     
        let result = [];
        for (var _i = 0; _i < recruitment.length; _i++) {
          var recruitmentData = recruitment[_i];
          // console.log('================', recruitmentData.jobComp)
          result.push({
            recruitment_id: recruitmentData.id,
            location: recruitmentData.jobCompany,
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


    async listCandidate(user_id: number, pageIndex: number, pageSize: number): Promise<any> {
      try{

        // Check into DB
        const recruitment: RecruitmentEntity[] = await this._RecruitmentRepository.find({ where: { user_id: user_id }, skip: pageIndex, take: pageSize});
        if (!recruitment) {
          throw new HttpException(VndErrorType.FAIL_TO_GET_DATA, 402);
        }
     
        let result = [];
        for (var _i = 0; _i < recruitment.length; _i++) {
          var recruitmentData = recruitment[_i];
          result.push({
            recruitment_id: recruitmentData.id,
            location: recruitmentData.jobCompany,
            logo_url: recruitmentData.jobCompany.logo_url,
            title: recruitmentData.title,
            salary: recruitmentData.salary,
            job_type: recruitmentData.job_type,

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

}
  
  