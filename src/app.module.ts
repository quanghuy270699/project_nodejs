import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user-account/user.module';
import { AuthModule } from './modules/user-auth/auth.module';
import { RedisCacheModule } from './cache/cache.module';
import { JobCvModule } from './modules/cv/cv.module';
import { RabbitqmModule } from './modules/rabbitmq/producer/producer-mq.module';
import { RecruitmentModule } from './modules/recruitment/recruitment.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    RedisCacheModule,  
    UserModule,
    AuthModule,
    JobCvModule,
    RabbitqmModule,
    RecruitmentModule,
    LocationModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.API_PORT)
  }
}
