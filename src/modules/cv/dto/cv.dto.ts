import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
export class avatarUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

}


export class createCvDto {
  @ApiProperty({ example: "Nguyen Van A CV" })
  cv_name: string;

  @ApiProperty({ example: "Nguyen Van A" })
  full_name: string;

  @ApiProperty({ example: '12/1/2001' })
  birthday: string;


  @ApiProperty({ example: 1 })
  gender: number;

  @ApiProperty({ example: "03656562565" })
  phone_number: string;


  @ApiProperty({ example: "nguyenvan@gmail.com" })
  email: string;

  @ApiProperty({ example: "Ha Dong, Ha Tay, Ha Noi" })
  address: string;


  @ApiProperty({ example: ["DH Thang Long", "Dai Hoc Kinh Te" ]})
  education: string[];


  @ApiProperty({ example: ["Cong Ty FPT SoftWare", "Cty Vin Smart"] })
  experience: string[];


  @ApiProperty({ example: ["Làm việc nhóm", "Excel", "World", "PowerPoint"] })
  skills: string[];

  @ApiProperty({ example:  "Kinh doanh"})
  career_name: string;

  @ApiProperty({ example:  1})
  career_id: number;

  @ApiProperty({ example:  "https://www.abc.com/file/dssfs"})
  avatar_url: string;

}

export class updateProfileCvDto {

  @ApiProperty({ example: 12 })
  id: number;

  @ApiProperty({ example: "Nguyen Van A CV" })
  cv_name: string;

  @ApiProperty({ example: "Nguyen Van A" })
  full_name: string;

  @ApiProperty({ example: '12/1/2001' })
  birthday: string;


  @ApiProperty({ example: 1 })
  gender: number;


  @ApiProperty({ example: "03656562565" })
  phone_number: string;

  @ApiProperty({ example: "nguyenvan@gmail.com" })
  email: string;

  @ApiProperty({ example: "Ha Dong, Ha Tay, Ha Noi" })
  address: string;


  @ApiProperty({ example: ["DH Thang Long", "Dai Hoc Kinh Te" ]})
  education: string[];


  @ApiProperty({ example: ["Cong Ty FPT SoftWare", "Cty Vin Smart"] })
  experience: string[];


  @ApiProperty({ example: ["Làm việc nhóm", "Excel", "World", "PowerPoint"] })
  skills: string[];

  
  @ApiProperty({ example:  'kinh doanh'})
  career_name: string;

  @ApiProperty({ example:  1})
  career_id: number;

  @ApiProperty({ example:  "https://www.abc.com/file/dssfs"})
  avatar_url: string;

}

export class ProfileCVDto {
  @ApiProperty({ example: 1 })
  cv_id: number;

}

export class createSubmitCvDto {
  @ApiProperty({ example: 2 })
  job_id: number;

  @ApiProperty({ example: 19 })
  cv_id: number;
}