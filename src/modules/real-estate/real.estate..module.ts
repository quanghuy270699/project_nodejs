import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repositry';
import { UserProfileRepository } from './repositories/user.profile.repository';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from 'src/config/config.service';
import { EkycService } from './ekyc.service';
@Module({
  imports: [TypeOrmModule.forFeature([
    UserRepository,
    UserProfileRepository
  ]),
  PassportModule.register({
    defaultStrategy: 'jwt',
  }),],
  providers: [UserService, ConfigService, EkycService],
  controllers: [UserController]
})
export class UserModule { }
