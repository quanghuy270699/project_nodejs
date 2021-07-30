import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repositories/auth.repository'
import { ConfigService } from '../../config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy'
import { ConfigModule } from '../../config/config.module';
import { Configuration } from '../../config/config.keys';
import { RedisCacheModule } from 'src/cache/cache.module';
import { UserRepository } from '../user-account/repositories/user.repositry';

@Module({
  imports: [
    RedisCacheModule,
    TypeOrmModule.forFeature([
      AuthRepository,
      UserRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: 60*10, // 10 minutes
          }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
