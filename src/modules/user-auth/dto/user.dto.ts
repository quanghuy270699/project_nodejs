import { IsNotEmpty, IsString } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  @IsString()
  Username: string
}