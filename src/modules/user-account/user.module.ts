import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repositry';
import { UserProfileRepository } from './repositories/user.profile.repository';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from 'src/config/config.service';
import { EkycService } from './ekyc.service';
import { LocationService } from '../location/location.service';
import { MProvinceRepository } from '../location/repositories/province.repositry';
import { MDistrictRepository } from '../location/repositories/district.repository';
import { MWardRepository } from '../location/repositories/ward.repository';
@Module({
  imports: [TypeOrmModule.forFeature([
    UserRepository,
    UserProfileRepository,
    MProvinceRepository,
    MDistrictRepository,
    MWardRepository
  ]),
  PassportModule.register({
    defaultStrategy: 'jwt',
  }),],
  providers: [UserService, ConfigService, EkycService, LocationService],
  controllers: [UserController]
})
export class UserModule { }
