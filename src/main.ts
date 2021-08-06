import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(json({ limit: '50mb' }));

  const options = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('API Docs')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('1.0')    
    .addTag('user')
    .addTag('auth user')
    .addBearerAuth({ type: 'http', scheme: 'bearer', 
                    in: 'header', bearerFormat: 'JWT', 
                    description: 'hihi', }, 'JWT-auth')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(AppModule.port);
}

bootstrap();
