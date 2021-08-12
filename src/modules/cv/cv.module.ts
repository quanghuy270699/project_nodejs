import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from 'src/config/config.service';
import { jobCvService } from './cv.service';
import { jobCvController } from './cv.controller';
import { JobCareerRepository } from './repositories/career.job.repository';
import { UserProfileRepository } from '../user-account/repositories/user.profile.repository';
import { UserRepository } from '../user-account/repositories/user.repositry';
import { JobCVRepository } from './repositories/cv.job.repositories';
import { CVJobRepository } from './repositories/cv.send.repository';
import { RecruitmentRepository } from '../recruitment/repositories/recruitment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    JobCareerRepository,
    UserProfileRepository,
    UserRepository,
    JobCVRepository,
    CVJobRepository,
    RecruitmentRepository
  ]),
  PassportModule.register({
    defaultStrategy: 'jwt',
  }),],
  providers: [jobCvService, ConfigService],
  controllers: [jobCvController]
})
export class JobCvModule { }