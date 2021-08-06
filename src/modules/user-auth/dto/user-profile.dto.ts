import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProDto {
  @IsString()
  @ApiProperty({ example: 'Nguyen Van A' })
  full_name: string;

  @IsString()
  @ApiProperty({ example: '12/12/2000' })
  birthday?: string;

  // @IsString()
  @ApiProperty({ example: 'Ha Noi' })
  gender?: number;

  @ApiProperty({ example: 1 })
  career_id?: number;


  @IsString()
  @ApiProperty({ example: 'email@gmail.com' })
  email?: string;


  @ApiProperty({ example: 1 })
  province_id?: number;


  @ApiProperty({ example: 1 })
  district_id?: number;


  @ApiProperty({ example: 1 })
  ward_id?: number;


  @ApiProperty({ example: 1 })
  adress?: string;
}