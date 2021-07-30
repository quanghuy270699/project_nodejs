import { Injectable, BadRequestException,
    HttpException, HttpStatus, 
    HttpService, NotFoundException } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { User } from './user.entity'
  import { UserRepository } from './repositories/user.repositry';
  import { UserProfileRepository } from './repositories/user.profile.repository';
  import { UserProfileDto } from '../user-auth/dto';
  import { VndErrorType } from 'src/shared/error/constant.error';
  import { S3 } from "aws-sdk";
  import { createReadStream } from 'fs'
  import { join } from 'path';

  import { Configuration } from '../../config/config.keys';
  
  
  const FormData = require("form-data")
  
  
  @Injectable()
  export class EkycService {
    private s3: any;
    constructor(
    ) { }
    
    async ApiGetTokenAi():Promise<any> {
        const httpService: HttpService = new HttpService();
        const url = 'http://192.168.100.108:5000/users/login';
        try {
            const params = JSON.stringify({"Username": "nhatnt", "Password": "123"})
            const response = await httpService.post(url, 
                                    params, 
                                    {headers: {"Content-Type": "application/json"}}).toPromise();
            const token = response.data.Data['TokenId']
            return token
          }
          catch(error){
            throw(error);
          }
      }
    
    async ApiUploadFile(token: string, Id: string, 
        filename: string, type: string):Promise<any> {
        const httpService: HttpService = new HttpService();
        const readStream = createReadStream(join("src/assets",`/${filename}`))
        const form = new FormData();
        form.append('file', readStream);
        form.append('userid', Id);
        form.append('type', type);
        const headers = {TokenId: token, ...form.getHeaders()};
        const url = 'http://192.168.100.108:5000/image/upload';
        try {
            const response = await httpService.post(url, form, {headers}).toPromise();
            const hash_md5 = response.data
            return hash_md5
        }catch (error) {
            console.log(error);
            throw error;
          }
      }

    async ApiEKYC(token: string, userid: string):Promise<any> {
      const httpService: HttpService = new HttpService();
      const url = "http://192.168.100.108:5000/api/ekyc";
      try {
          const payload = {
            "userid": userid
          };
          const params = JSON.stringify(payload);
          const response = await httpService.post(url, 
                                  params, 
                                  {headers: {"Content-Type": "application/json",
                                            "TokenId": token}}).toPromise();
          const result = response.data;
          return result

      }
      catch(error){
        throw(error);
      }
    }
  
  }
  
  