import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user-account/user.module';
import { AuthModule } from './modules/user-auth/auth.module';
import { RedisCacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    RedisCacheModule,  
    UserModule,
    AuthModule
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
