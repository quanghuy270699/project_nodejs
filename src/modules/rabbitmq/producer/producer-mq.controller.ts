import { Controller, Get } from '@nestjs/common';
import * as amqp from "amqp-connection-manager";
import { RabbitmqService } from './producer-mq.service';

@Controller('')
export class ProducerController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @Get('test')
  async getHello() {
    
    await this.rabbitmqService.sendToQueue()
    return 'Message sent to the queue!';
  }
}