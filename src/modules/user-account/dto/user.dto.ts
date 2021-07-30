import { IsNotEmpty } from 'class-validator'

export class UserDto {
  upload_type: string;

  cccd_type: string;
  
  file: any;
}

export class UserIdDto {
  user_id: number;

}