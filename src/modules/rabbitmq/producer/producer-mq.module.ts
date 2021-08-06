import { Module } from '@nestjs/common';
import { ProducerController } from './producer-mq.controller';
import { RabbitmqService } from './producer-mq.service';

@Module({
  imports: [],
  providers: [RabbitmqService],
  controllers: [ProducerController]
})
export class RabbitqmModule {}