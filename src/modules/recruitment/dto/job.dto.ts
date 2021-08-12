import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ example: "Tuyen Nhan vien ban hang" })
  title: string;

  @ApiProperty({ example: ['Mo ta cong ty dang list'] })
  description: string[];


  @ApiProperty({ example: 1, description: 'nganh nghe'})
  job_career: string;

  @ApiProperty({ example: "Cap Bac: Truong Phong" })
  level_id: string;


  @ApiProperty({ example: "Dai Hoc, Trung cap" })
  require_degree: string;

  @ApiProperty({ example: "1 nguoi" })
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

  @ApiProperty({ example: 1 })
  require_time: number;


  @ApiProperty({ example: "03656562565" })
  phone_number: string;


  @ApiProperty({ example: "20/02/2021 - 24/03/2021" })
  expired_date: string;

  @ApiProperty({ example:  1})
  user_id: number;

  @ApiProperty({ example:  "Vinh Yen"})
  district_id: string;

  @ApiProperty({ example:  "Vinh Phuc"})
  province_id: string;
  

}