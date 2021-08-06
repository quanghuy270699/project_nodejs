import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from 'src/config/config.service';
import { jobCvService } from './job.cv.service';
import { jobCvController } from './job.cv.controller';
import { JobCareerRepository } from './repositories/job.career.repository';
import { UserProfileRepository } from '../user-account/repositories/user.profile.repository';
import { UserRepository } from '../user-account/repositories/user.repositry';
import { JobCVRepository } from './repositories/job.cv.repositories';

@Module({
  imports: [TypeOrmModule.forFeature([
    JobCareerRepository,
    UserProfileRepository,
    UserRepository,
    JobCVRepository
  ]),
  PassportModule.register({
    defaultStrategy: 'jwt',
  }),],
  providers: [jobCvService, ConfigService],
  controllers: [jobCvController]
})
export class JobCvModule { }