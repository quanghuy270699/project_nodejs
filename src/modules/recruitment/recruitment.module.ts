import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from 'src/config/config.service';
import { JobCareerRepository } from '../cv/repositories/career.job.repository';
import { UserProfileRepository } from '../user-account/repositories/user.profile.repository';
import { UserRepository } from '../user-account/repositories/user.repositry';
import { recruitmentController } from './recruitment.controller';
import { recruitmentService } from './recruitment.service';
import { JobCompanyRepository } from './repositories/job.company.repositories';
import { RecruitmentRepository } from './repositories/recruitment.repository';
import { FieldsCareerRepository } from './repositories/fields.career.repository';


@Module({
  imports: [TypeOrmModule.forFeature([
    JobCareerRepository,
    UserProfileRepository,
    UserRepository,
    JobCompanyRepository,
    RecruitmentRepository,
    FieldsCareerRepository
    

 ]),
  PassportModule.register({
    defaultStrategy: 'jwt',
  }),],
  providers: [recruitmentService, ConfigService],
  controllers: [recruitmentController]
})
export class RecruitmentModule { }