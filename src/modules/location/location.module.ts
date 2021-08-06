import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { MWardRepository } from './repositories/ward.repository';
import { MDistrictRepository } from './repositories/district.repository';
import { MProvinceRepository } from './repositories/province.repositry';
@Module({
  imports: [TypeOrmModule.forFeature([
    MProvinceRepository,
    MDistrictRepository,
    MWardRepository,
  ]),
  PassportModule.register({
    defaultStrategy: 'jwt',
  }),],
  providers: [LocationService],
  controllers: [LocationController]
})
export class LocationModule { }
