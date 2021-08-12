import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class UploadDto {
  @ApiProperty({
    type: String,
    example: 'cover, logo',
  })
  upload_type: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

}


export class CreateProfileDto {
  @ApiProperty({ example: "Cong ty Co Phan A" })
  company_name: string;

  @ApiProperty({ example: "https://www.programmersought.com/article/68922452650.jpg" })
  cover_url: string;

  @ApiProperty({ example: "https://www.programmersought.com/article/68922452650.jpg" })
  logo_url: string;

  @ApiProperty({ example: ['Mo ta cong ty dang list'] })
  description: string[];


  @ApiProperty({ example: "Dia chi cong ty" })
  location: string;

  @ApiProperty({ example: "Quy mo cong ty" })
  size: string;


  @ApiProperty({ example: "03656562565" })
  phone_number: string;


  @ApiProperty({ example: "nguyenvan@gmail.com" })
  email: string;

  @ApiProperty({ example:  "https://www.abc.com/"})
  website: string;


  @ApiProperty({ example: ["Gioi thieu cong ty", "ma so thue"] })
  intro: string[];


  @ApiProperty({ example: ["su menh", "tam nhin" ]})
  core_values: string[];


  @ApiProperty({ example:  "kinh doanh"})
  fields_career_name: string;

  @ApiProperty({ example:  1})
  fields_career_id: number;


  @ApiProperty({ example:  "1234242313223"})
  tax_id: string;

  @ApiProperty({ example:  1})
  user_id: number;
  

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

  @ApiProperty({ example:  1})
  career_name: number;

  @ApiProperty({ example:  "https://www.abc.com/file/dssfs"})
  avatar_url: string;

}

export class CreateRecruitmentDto {
  @ApiProperty({ example: "Tuyen Nhan vien ban hang" })
  title: string;

  @ApiProperty({ example: ['Mo ta cong ty (type list)'] })
  description: string[];


  @ApiProperty({ example: "Kinh doanh", description: 'nganh nghe'})
  job_career: string;

  @ApiProperty({ example: 1, description: 'nganh nghe'})
  job_career_id: number;

  @ApiProperty({ example: "Cap Bac: Truong Phong" })
  level_id: string;


  @ApiProperty({ example: "Dai Hoc, Trung cap" })
  require_degree: string;

  @ApiProperty({ example: "1- 3 nguoi" })
  require_amount: string;

  @ApiProperty({ example: "20" })
  require_age_start: number;

  @ApiProperty({ example: "23" })
  require_age_end: number;

  @ApiProperty({ example: "1" })
  require_gender: number;


  @ApiProperty({ example: 25 })
  salary: number;

  @ApiProperty({ example: ["Khong yeu cau kinh nghiem"] })
  require_experience: string[];

  @ApiProperty({ example: ["Luong thuong", "nghi tet", "du lich"] })
  employee_benefits: string[];

  @ApiProperty({ example: 3 })
  require_time: number;

  @ApiProperty({ example: 1 })
  job_type: number;


  @ApiProperty({ example: "24/03/2021" })
  expired_date: string;

  // @ApiProperty({ example:  1})
  // user_id: number;

  @ApiProperty({ example:  1})
  district_id: number;

  @ApiProperty({ example:  1})
  province_id: number;
  

}

export class ProfileCVDto {
  @ApiProperty({ example: 1 })
  cv_id: number;

}


export class ListJobDto {
  @ApiProperty({ example: 1 })
  pageIndex: number;

  @ApiProperty({ example: 5 })
  pageSize: number;

  @ApiProperty({ example: 1, description:"thời gian: toàn thời gian, bán thời gian",  nullable: true })
  job_type: number;

  @ApiProperty({ example: 6, nullable: true })
  time_id: number;

  @ApiProperty({ example: 1, nullable: true })
  career_id?: number;

  @ApiProperty({ example: 3, nullable: true })
  salary_id?: number;

  @ApiProperty({ example: 3, nullable: true })
  province_id?: number;

  @ApiProperty({ example: 3, nullable: true })
  district_id?: number;



}

export class NewsRecruitmentDto {
  @ApiProperty({ example: 1 })
  recruitment_id: number;

}

export class ListCandidateDto {
  @ApiProperty({ example: 1 })
  recruitment_id: number;

}