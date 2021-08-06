import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';


export class DistrictDto {
  @ApiProperty({ example: 2 })
  province_id: number;

}

export class WardtDto {
  @ApiProperty({ example: 1 })
  district_id: number;

}
