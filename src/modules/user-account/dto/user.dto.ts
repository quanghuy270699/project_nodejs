import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';


export class UserDto {
  @ApiProperty({
    type: String,
    example: '0, 1, 2, 3, 4, 5, 6',
  })
  type: string;


  @ApiProperty({ type: 'file', format: 'binary' })
  file: any;
}

export class UserIdDto {
  user_id: number;

}

export class UserUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

}


export class UpdateProfileDto {
  @ApiProperty({ example: 'Nguyen Van A' })
  full_name: string;

  @ApiProperty({ example: '12/12/2000' })
  birthday?: string;

  @ApiProperty({ example: 1 })
  gender?: number;

  @ApiProperty({ example: 1 })
  career_id?: number;


  @ApiProperty({ example: 'email@gmail.com' })
  email?: string;


  @ApiProperty({ example: 1 })
  province_id?: number;


  @ApiProperty({ example: 1 })
  district_id?: number;


  @ApiProperty({ example: 1 })
  ward_id?: number;


  @ApiProperty({ example: "Hải An, Hải Dương" })
  address?: string;
}

