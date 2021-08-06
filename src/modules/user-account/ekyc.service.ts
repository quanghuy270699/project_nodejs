import { Injectable, BadRequestException,
    HttpException, HttpStatus, 
    HttpService, NotFoundException } from '@nestjs/common';

import { VndErrorType } from 'src/shared/error/constant.error';
import { createReadStream } from 'fs'
import { join } from 'path';

const FormData = require("form-data")
  
  
  @Injectable()
  export class EkycService {
    private s3: any;
    constructor(
    ) { }
    
    async ApiGetTokenAi():Promise<any> {
        const httpService: HttpService = new HttpService();
        const url = 'http://192.168.100.108:5002/users/login';
        try {
            const params = JSON.stringify({"Username": "nhatnt", "Password": "123"})
            const response = await httpService.post(url, 
                                    params, 
                                    {headers: {"Content-Type": "application/json"}}).toPromise();
            const token = response.data.Data['TokenId']
            return token
          }
          catch(error){
            VndErrorType.REQUEST_TO_AI_FAIL['Message'] = error.message
            throw new HttpException(VndErrorType.REQUEST_TO_AI_FAIL, HttpStatus.BAD_REQUEST);
          }
      }
    
    async ApiUploadFile(token: string, Id: string, 
        filename: string, type: string):Promise<any> {
        const httpService: HttpService = new HttpService();
        const readStream = createReadStream(join("src/assets",`/${filename}`))

        // console.log('---------------readStream---------------------', readStream)
        const form = new FormData();
        form.append('file', readStream);
        form.append('userid', Id);
        form.append('type', type);
        const headers = {TokenId: token, ...form.getHeaders()};
        const url = 'http://192.168.100.108:5002/image/upload';
        try {
            const response = await httpService.post(url, form, {headers}).toPromise();
            const hash_md5 = response.data
            return hash_md5
        }catch (error) {
          VndErrorType.REQUEST_TO_AI_FAIL['Message'] = error.message
          throw new HttpException(VndErrorType.REQUEST_TO_AI_FAIL, HttpStatus.BAD_REQUEST);
          }
      }

    async ApiEKYC(token: string, user_id: string, userProfile: any, userProfileRepository: any):Promise<any> {
      const httpService: HttpService = new HttpService();
      const url = "http://192.168.100.108:5002/api/ekyc";
      try {
          const payload = {
            "userid": user_id
          };
          console.log('-------------0-----------')
          const params = JSON.stringify(payload);
          console.log('-------------1-----------')
          const response = await httpService.post(url, 
                                  params, 
                                  {headers: {"Content-Type": "application/json",
                                            "TokenId": token}}).toPromise();
          const response_data = response.data;
          console.log('-------------0-----------', response_data)
          

          console.log('==========response_data==============', response_data)
          if (response_data['StatusCode'] === 200){
            await userProfileRepository.update(user_id, 
              {cccd: response_data['Data']['id_number'],
              cccd_location: response_data['Data']['location'],
              hometown: response_data['Data']['hometown'],
              address: response_data['Data']['address'],
              cccd_date: response_data['Data']['date'],
              birthday: response_data['Data']['dob'], ekyc:true},
              )

            return  {
              StatusCode: 200, 
              Message: 'Success',
              Data: {"user_id":user_id,
                    "is_verified":true,
                    "face_liveness": true,
                    "face_compare":true,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
   
                  }
            };
          }
  
          else if (response_data['StatusCode'] === 201){
            return {
              ErrorCode: 200, 
              Message: 'Error front id card',
              Data: {"user_id":user_id,
                    "is_verified":false,
                    "face_liveness": true,
                    "cccd_front":false,
                    "face_compare":false,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
                    }
            };
          }
  
          else if (response_data['StatusCode'] === 203){
            return {
              StatusCode: 200, 
              Message: 'error back id card',
              Data: {"user_id":user_id,
                    "is_verified":false,
                    "face_liveness": true,
                    "cccd_back":false,
                    "face_compare":true,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
   
                  }
                };
          }
          else if (response_data['StatusCode'] === 205){
            return {
              StatusCode: 200, 
              Message: 'error selfie',
              Data: {"user_id":user_id,
                    "is_verified":false,
                    "face_liveness": false,
                    "face_compare":false,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
   
                  }
                };
          }
          else if (response_data['StatusCode'] === 204){
            return {
              StatusCode: 200, 
              Message: 'error frond and back id card',
              Data: {"user_id":user_id,
                    "is_verified":false,
                    "face_liveness": true,
                    "cccd_back":false,
                    "face_compare":false,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
   
                  }
                };
          }
          else if (response_data['StatusCode'] === 206){
            return {
              StatusCode: 200, 
              Message: 'error front and selfie',
              Data: {"user_id":user_id,
                    "is_verified":false,
                    "face_liveness": false,
                    "cccd_front":false,
                    "face_compare":false,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
   
                  }
                };
          }
          else if (response_data['StatusCode'] === 208){
            return {
              StatusCode: 200, 
              Message: 'error front back and selfie id card',
              Data: {"user_id":user_id,
                    "is_verified":false,
                    "face_liveness": false,
                    "cccd_front":false,
                    "cccd_back":false,
                    "face_compare":false,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
   
                  }
                };
          }
          else if (response_data['StatusCode'] === 210){
            return {
              StatusCode: 200, 
              Message: 'error liveness',
              Data: {"user_id":user_id,
                    "is_verified":false,
                    "cccd_front":false,
                    "face_compare":false,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
   
                  }
                };
          }
          else if (response_data['StatusCode'] === 214){
            return {
              StatusCode: 200, 
              Message: 'error front and back and liveness',
              Data: {"user_id":user_id,
                    "is_verified":false,
                    "face_liveness": false,
                    "cccd_front":false,
                    "cccd_back":false,
                    "face_compare":false,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
   
                  }
                };
          }

          else if (response_data['StatusCode'] === 215){
            return {
              StatusCode: 200, 
              Message: 'error face not found',
              Data: {"user_id":user_id,
                    "is_verified":false,
                    "face_liveness": false,
                    "face_compare":false,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
   
                  }
                };
          }
          else if (response_data['StatusCode'] === 216){
            return {
              StatusCode: 200, 
              Message: 'error fron and selfie and liveness',
              Data: {"user_id":user_id,
                    "is_verified":false,
                    "cccd_front":false,
                    "face_liveness": false,
                    "face_compare":false,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
   
                  }
                };
          }
          else if (response_data['StatusCode'] === 218){
            return {
              StatusCode: 218, 
              Message: 'error back and selfie and liveness',
              Data: {"user_id":user_id,
                    "is_verified":false,
                    "face_liveness": false,
                    "cccd_back":false,
                    "face_compare":false,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
   
                  }
                };
          }
          else if (response_data['Message'] === "more_face"){
            return {
              StatusCode: 219, 
              Message: 'Image has more than one face',
              Data: {"user_id":user_id,
                    "is_verified":false,
                    "cccd_front":true,
                    "cccd_back":true,
                    "face_compare":true,
                    "full_name":response_data['Data']['name'],
                    "birthday": response_data['Data']['dob'],
                    "cccd_number": response_data['Data']['id_number'],
                    "hometown":response_data['Data']['hometown'],
                    "address": response_data['Data']['address'],
                    "image_face_url": userProfile.image_face_url,
                    "image_cccd_front_url": userProfile.image_cccd_front_url,
                    "image_cccd_back_url": userProfile.image_cccd_back_url
   
                  }
                };
          }
          else if (null !== userProfile.cccd){
            if (response_data['Data']['id_number'] !== userProfile.cccd){
              return {
                StatusCode: 208, 
                Message: 'cccd Id not match',
                Data: {"user_id":user_id,
                      "is_verified":false,
                      "cccd_front":false,
                      "face_liveness": false,
                      "cccd_back":false,
                      "face_compare":false,
                      "full_name":response_data['Data']['name'],
                      "birthday": response_data['Data']['dob'],
                      "cccd_number": response_data['Data']['id_number'],
                      "hometown":response_data['Data']['hometown'],
                      "address": response_data['Data']['address'],
                      "image_face_url": userProfile.image_face_url,
                      "image_cccd_front_url": userProfile.image_cccd_front_url,
                      "image_cccd_back_url": userProfile.image_cccd_back_url
     
                    }
                  };
            }  
          }

          else {
              return {
                StatusCode: 220, 
                Message: 'error   all',
                Data: {"user_id":user_id,
                      "cccd_front":false,
                      "is_verified":false,
                      "cccd_back":false,
                      "face_compare":false,
                      "full_name":response_data['Data']['name'],
                      "birthday": response_data['Data']['dob'],
                      "cccd_number": response_data['Data']['id_number'],
                      "hometown":response_data['Data']['hometown'],
                      "address": response_data['Data']['address'],
                      "image_face_url": userProfile.image_face_url,
                      "image_cccd_front_url": userProfile.image_cccd_front_url,
                      "image_cccd_back_url": userProfile.image_cccd_back_url
     
                    }
                  };
            }  

          

      }
      catch(error){
          VndErrorType.REQUEST_TO_AI_FAIL['Message'] = error.message
          throw new HttpException(VndErrorType.REQUEST_TO_AI_FAIL, HttpStatus.BAD_REQUEST);
      }
    }
  
  }
  
  